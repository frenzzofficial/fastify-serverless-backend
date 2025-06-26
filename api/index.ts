import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app'; // Adjust the path if needed


// Vercel handler
export default async (req: VercelRequest, res: VercelResponse) => {
    // Fastify's inject method simulates an HTTP request
    const result = await app.inject({
        method: req.method as any,
        url: req.url || '/',
        headers: req.headers as any,
        payload: req.body,
    });

    res.status(result.statusCode);
    for (const [key, value] of Object.entries(result.headers)) {
        if (value) res.setHeader(key, value as string);
    }
    res.send(result.body);
};