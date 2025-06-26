import app from "@/vercel/output/app";

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}
