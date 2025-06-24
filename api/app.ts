
import { html } from 'api/index.js';
import Fastify from 'fastify'
const app = Fastify({
    logger: true,
})

app.get('/', async (req, reply) => {
    return reply.status(200).type('text/html').send(html)
})

export default app;