import app from "../src/app.js"
import { VercelRequest, VercelResponse } from '@vercel/node'

app.get('/', async (req, res) => {
    return res.status(200).type('text/html').send(html)
})

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
    <title>Vercel + Fastify Hello World</title>

  </head>
  <body>
    <h1>Vercel + Fastify Hello World</h1>

  </body>
</html>
`
// Export handler for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
    await app.ready()
    app.server.emit("request", req, res)
}
