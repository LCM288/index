import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * The handler that handles the login
 * if success, set jwt token cookie and redirect to index
 * @async
 * @param {NextApiRequest} req - The server request object
 * @param {NextApiResponse} res - The server response object
 */
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (!req.body.code) {
    res.status(400).end("No authorization code recieved.");
    return;
  }
  if (!process.env.SOC_ADMIN_URL) {
    res.status(500).end("Soc admin url not configured.");
    return;
  }
  try {
    const { host = "" } = req.headers;
    const protocol = /^localhost/g.test(host) ? "http" : "https";
    const baseUrl = req.body.baseUrl ?? `${protocol}://${req.headers.host}`;
    const result = await axios.post(`${process.env.SOC_ADMIN_URL}/api/login`, {
      code: req.body.code,
      baseUrl,
    });
    const setCookieHeader = result.headers["set-cookie"]?.[0];
    if (!setCookieHeader) {
      throw new Error(`Did not recieved jwt cookie`);
    }
    if (process.env.NODE_ENV === "development") {
      res.setHeader("Set-Cookie", setCookieHeader.replace("__Host-", ""));
    } else {
      res.setHeader("Set-Cookie", setCookieHeader);
    }
    res.end("<script>window.location.href='/'</script>");
  } catch (err) {
    console.error(err);
    res.end("Authorization Error " + (err as Error).message);
  }
};
