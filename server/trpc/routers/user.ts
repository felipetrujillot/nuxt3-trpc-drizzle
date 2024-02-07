import type { Users } from "~/server/db/schema";
import jwt from "jsonwebtoken";

/**
 * Desencripta un token jwt, retorna objeto
 * @param bearerToken
 */
export const desencriptaToken = async (bearerToken: string) => {
  const config = useRuntimeConfig();

  const token = bearerToken.replace("Bearer ", "");

  const decoded = await new Promise((resolve) => {
    jwt.verify(token, config.jwtSecret as string, (err, decoded) => {
      if (err) {
        throw err;
      } else {
        resolve(decoded);
      }
    });
  });
  return decoded as Users;
};
