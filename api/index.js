import app from "../src/app"

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}