// import type { VercelRequest, VercelResponse } from "@vercel/node"
// import Fastify from "fastify"

// // Create Fastify instance
// const app = Fastify({
//     logger: process.env.NODE_ENV === "development",
// })

// // Register CORS
// await app.register(import("@fastify/cors"), {
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true,
// })

// // Register routes
// app.get("/health", async (request, reply) => {
//     return { status: "ok", timestamp: new Date().toISOString() }
// })

// app.get("/user", async (request, reply) => {
//     // Get session from cookie (simplified)
//     const cookies = parseCookies(request.headers.cookie || "")
//     const session = cookies.session

//     if (!session) {
//         reply.code(401)
//         return { error: "Unauthorized" }
//     }

//     // In production, validate session and get user from database
//     return {
//         message: "User authenticated",
//         session: session,
//     }
// })

// app.post("/api/data", async (request, reply) => {
//     const { data } = request.body as { data: any }

//     // Process data here
//     return {
//         success: true,
//         received: data,
//         timestamp: new Date().toISOString(),
//     }
// })

// function parseCookies(cookieHeader: string): Record<string, string> {
//     const cookies: Record<string, string> = {}
//     cookieHeader.split(";").forEach((cookie) => {
//         const [name, value] = cookie.trim().split("=")
//         if (name && value) {
//             cookies[name] = decodeURIComponent(value)
//         }
//     })
//     return cookies
// }

// export default app;

import Fastify from 'fastify'

const app = Fastify({
    logger: true,
})

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

export default app;
