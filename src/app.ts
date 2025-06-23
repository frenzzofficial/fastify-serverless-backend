import Fastify from 'fastify';

const app = Fastify();


app.get('/', async (req, reply) => {
    return { message: 'Welcome to the Fastify Serverless Backend!' };
});

export default app;