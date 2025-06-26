import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
const app = Fastify({
  logger: true,
})

app.get('/', async (_req: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).type('text/html').send(html)
})

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

export default app;