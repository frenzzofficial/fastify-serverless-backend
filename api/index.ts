
import type { VercelRequest, VercelResponse } from "@vercel/node";
// import app from "./app";



import Fastify from 'fastify'
const app = Fastify({
  logger: true,
})

app.get('/', async (req, reply) => {
  return reply.status(200).type('text/html').send(html)
})
export default async function handler(req: VercelRequest, reply: VercelResponse) {
  await app.ready()
  app.server.emit('request', req, reply)
}

export const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
    <title>Fastify Backend</title>
  </head>
  <body>
    <h1>Vercel Fastify template</h1>
  </body>
</html>
`