
import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "./app";

export default async function handler(req: VercelRequest, reply: VercelResponse) {
  await app.ready()
  app.server.emit('request', req, reply)
}
