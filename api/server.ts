import type { VercelRequest, VercelResponse } from "@vercel/node"
import Fastify from "fastify"

// Create Fastify instance
const fastify = Fastify({
    logger: process.env.NODE_ENV === "development",
})

// Register CORS
await fastify.register(import("@fastify/cors"), {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
})

// Register routes
fastify.get("/health", async (request, reply) => {
    return { status: "ok", timestamp: new Date().toISOString() }
})

fastify.get("/user", async (request, reply) => {
    // Get session from cookie (simplified)
    const cookies = parseCookies(request.headers.cookie || "")
    const session = cookies.session

    if (!session) {
        reply.code(401)
        return { error: "Unauthorized" }
    }

    // In production, validate session and get user from database
    return {
        message: "User authenticated",
        session: session,
    }
})

fastify.post("/api/data", async (request, reply) => {
    const { data } = request.body as { data: any }

    // Process data here
    return {
        success: true,
        received: data,
        timestamp: new Date().toISOString(),
    }
})

// Export handler for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
    await fastify.ready()
    fastify.server.emit("request", req, res)
}

function parseCookies(cookieHeader: string): Record<string, string> {
    const cookies: Record<string, string> = {}
    cookieHeader.split(";").forEach((cookie) => {
        const [name, value] = cookie.trim().split("=")
        if (name && value) {
            cookies[name] = decodeURIComponent(value)
        }
    })
    return cookies
}