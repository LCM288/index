import { GetServerSidePropsContext } from "next";
import { IncomingMessage, ServerResponse } from "http";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { User } from "@/types/datasources";
import { post } from "utils/httpHelpers";
import { firestore } from "@/store";

/**
 * Check whether the user is an executive
 * @async
 * @param token - The jwt token of the user
 * @returns whether the user is an executive
 */
export const isAdmin = (user: User): boolean => {
  return user.isAdmin;
};

/**
 * Set the response header to set cookie for jwt token
 * @param {string} token - The jwt token to be set
 * @param {ServerResponse} res - The server response object
 */
export const setJwtHeader = (token: string, res: ServerResponse): void => {
  if (process.env.NODE_ENV === "development") {
    res.setHeader(
      "Set-Cookie",
      `jwt=${token}; Max-Age=1800; Path=/; HttpOnly; SameSite=Strict`
    );
  } else {
    res.setHeader(
      "Set-Cookie",
      `__Host-jwt=${token}; Max-Age=1800; Path=/; HttpOnly; Secure; SameSite=Strict`
    );
  }
};

/**
 * Get user from the jwt cookie
 * @async
 * @param token - The jwt token
 * @returns decoded user or null if invalid
 */
export const getUserFromToken = async (token: string): Promise<User | null> => {
  try {
    const socAdminDoc = await firestore
      .collection("keys")
      .doc("socAdmin")
      .get();
    if (!socAdminDoc.exists) {
      console.error("socAdmin document not found");
      return null;
    }
    const jwtPublicKey = socAdminDoc.data()?.publicKey;

    if (!jwtPublicKey) {
      return null;
    }

    const user = <User>(
      jwt.verify(token, jwtPublicKey, { algorithms: ["RS256"] })
    );
    return user;
  } catch {
    return null;
  }
};

/**
 * Get the jwt token from the request
 * @param req - The incoming HTTP request
 * @returns the jwt token from the request
 */
export const getJWTToken = (req: IncomingMessage): string | null => {
  const cookies = parseCookies({ req });
  const token =
    process.env.NODE_ENV === "development"
      ? cookies.jwt
      : cookies["__Host-jwt"];
  return token;
};

/**
 * Get user from the request using the jwt cookie
 * @async
 * @param req - The incoming HTTP request
 * @returns decoded user or null if invalid
 */
export const getUserFromRequest = async (
  req: IncomingMessage
): Promise<User | null> => {
  const token = getJWTToken(req);
  if (!token) {
    return null;
  }
  return getUserFromToken(token);
};

/**
 * Get user through the cookie and update the token
 * @async
 * @param ctx - The server side props context
 * @returns decoded user or undefined if invalid
 */
export const getUserAndRefreshToken = async (
  ctx: GetServerSidePropsContext
): Promise<User | null> => {
  try {
    const oldToken = getJWTToken(ctx.req);
    const result = await post(
      `${process.env.SOC_ADMIN_URL ?? ""}/api/graphql`,
      {
        query: "mutation { refreshJWT }",
      },
      {
        headers: { Cookie: `__Host-jwt=${oldToken}` },
      }
    );
    const newToken = result.data.data.refreshJWT;
    setJwtHeader(newToken, ctx.res);
    // since we recieved the token from soc admin directly, skip verifying to save bandwidth
    return jwt.decode(newToken) as User;
  } catch (err) {
    console.error(err);
    return null;
  }
};
