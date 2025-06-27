import cookie from "@fastify/cookie";
import fp from "fastify-plugin";
import type { FastifyCookieOptions } from "@fastify/cookie";
import type { FastifyInstance } from "fastify";
import { envCookieValue, envJWTServices } from "../constants/config.env";

const cookiePlugin = fp(
  async (fastify: FastifyInstance) => {
    fastify.register(cookie, {
      secret: envJWTServices.JWT_SECRET_TOKEN, // for cookies signature
      // options for parsing cookies
      parseOptions: {
        sameSite: "none",
        secure: envCookieValue.COOKIE_SECURE, // true in prod (HTTPS), false in dev (HTTP)
        httpOnly: true,
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
    } as FastifyCookieOptions);
  },
  {
    name: "cookie",
  }
);

export default cookiePlugin;
