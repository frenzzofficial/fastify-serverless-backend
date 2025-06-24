import app from "../src/app.js"
import { VercelRequest, VercelResponse } from '@vercel/node'

// Export handler for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
    await app.ready()
    app.server.emit("request", req, res)
}
