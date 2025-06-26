import app from "../dist/app";

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}
