import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import qs from "qs";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (process.env.LOGIN_AS !== "enabled") {
    res.status(404).end("404 Not Found");
    return;
  }
  const { sid, name } = req.query;
  if (typeof sid !== "string") {
    res.status(400).end("sid not specified");
    return;
  }
  if (typeof name !== "string") {
    res.status(400).end("name not specified");
    return;
  }

  try {
    const result = await axios.get(`${process.env.SOC_ADMIN_URL}/api/loginAs`, {
      params: {
        sid,
        name,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
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
    res.status(500).end("Login Error.");
  }
};
