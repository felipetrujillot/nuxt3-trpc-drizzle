import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Users } from "~/server/db/schema";
import { publicProcedure, router } from "../trpc";
import { db } from "~/server/db/db";
import { passwords_reset, users } from "~/server/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { sendMailPasswordForget } from "./mail";
import { generateRandom13Digits } from "~/composables/helper";

export const userTrpc = router({
  /**
   * Busca un proyecto según id_proyecto_linkcloud
   * @param email
   * @param password
   */
  loginApi: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .query(async (opts): Promise<LoginResponse> => {
      const { email, password } = opts.input;

      /**
       * busca usuario y válida que esté activo
       */
      const usuario = await db
        .select()
        .from(users)
        .where(and(eq(users.email, email), eq(users.active, 1)))
        .limit(1);

      if (usuario.length == 0) {
        return {
          status: "err" as const,
          data: "No se encontró el usuario",
        } as const;
      }

      let dbPass = String(usuario[0].password);
      /**
       * fix para integrar la api de laravel con express
       * momentaneo hasta que hagamos migración 100% a express
       * src https://stackoverflow.com/questions/56656617/node-js-how-to-check-a-laravel-hashed-password-with-bcrypt
       */
      dbPass = dbPass.replace(/^\$2y(.+)$/i, "$2a$1");

      const bcrypt = await bcryptToken(usuario[0], password, dbPass);
      return bcrypt;
    }),

  /**
   *
   */
  restorePassword: publicProcedure
    .input(
      z.object({
        password: z.string(),
        token: z.string(),
      })
    )
    .query(async (opts) => {
      const { token, password } = opts.input;

      //busca usuario y válida que esté activo
      const foundToken = await db
        .select()
        .from(passwords_reset)
        .where(
          and(eq(passwords_reset.token, token), eq(passwords_reset.active, 1))
        )
        .limit(1);

      if (foundToken.length === 0)
        return {
          status: "err" as const,
          data: "El token de restauración expiró",
        } as const;

      const hashPassword = await hashPasswordBcrypt(password);

      const res = await db
        .update(users)
        .set({
          password: hashPassword,
        })
        .where(eq(users.id_user, foundToken[0].id_user));

      if (res[0].changedRows === 0)
        return {
          status: "err" as const,
          data: "No se encontró el token de restauración de contraseña, intenta enviando otra solicitud de restauración de contraseña en https://linebox.cl",
        } as const;

      await db
        .update(passwords_reset)
        .set({ active: 0 })
        .where(eq(passwords_reset.token, token));

      return {
        status: "ok" as const,
        data: "La contraseña se actualizó correctamente",
      };
    }),

  /**
   *
   */
  forgetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .query(async (opts) => {
      const { email } = opts.input;

      //busca usuario y válida que esté activo
      const foundUser = await db
        .select()
        .from(users)
        .where(and(eq(users.email, email), eq(users.active, 1)))
        .limit(1);

      if (foundUser.length === 0)
        return {
          status: "err" as const,
          data: "No se encontró el email",
        } as const;

      const token = generateRandom13Digits() + "";

      const url = "https://linebox.cl";

      await db.insert(passwords_reset).values({
        active: 1,
        id_user: foundUser[0].id_user,
        token: token,
      });
      /* console.log(`${url}/${token}`)

      return {
        status: 'err' as const,
        data: 'error',
      } */

      sendMailPasswordForget(email, `${url}/reset/${token}`);

      return {
        status: "ok" as const,
        data: `Enviamos un correo de recuperación de contraseña a ${email}`,
      };
    }),

  /**
   *
   */
  getUser: publicProcedure.query(async (opts) => {
    const { id_user } = opts.ctx.user!;
    return (
      await db
        .select({
          name: users.name,
          lastname: users.lastname,
          email: users.email,
        })
        .from(users)
        .where(eq(users.id_user, id_user))
        .limit(1)
    )[0];
  }),
});
type LoginResponse =
  | { status: "err"; data: string }
  | {
      status: "ok";
      data: string;
      token: string;
      usuario_db: Users;
    };

/**
 *
 * @param usuario
 * @param id_partner
 * @param password
 * @param dbPass
 * @returns
 */
export const bcryptToken = async (
  usuario: Users,
  password: string,
  dbPass: string
) => {
  const config = useRuntimeConfig();

  const usuarioPartner = {
    ...usuario,
  };
  const decoded: LoginResponse = <LoginResponse>await new Promise((resolve) => {
    bcrypt.compare(password, dbPass, (bcryptErr, isMatch) => {
      if (bcryptErr || !isMatch) {
        resolve({
          status: "err" as const,
          data: "La contraseña no es válida",
        });
      }

      // Create and sign the JWT token
      const token = jwt.sign(usuarioPartner, config.jwtSecret as string, {
        expiresIn: "3y",
      });
      resolve({
        status: "ok" as const,
        data: "Login correcto",
        usuario_db: usuarioPartner,
        token: token,
      });
    });
  });

  return decoded;
};

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

export const hashPasswordBcrypt = async (plaintextPassword: string) => {
  // Generate a salt
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the generated salt
  const hash = await bcrypt.hash(plaintextPassword, salt);

  // Return the hashed password
  return hash;
};
