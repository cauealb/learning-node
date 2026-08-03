import fastify from "fastify";
import { AppRoutes } from "./http/routes.js";
import { ZodError } from "zod";
import { env } from "./env/index.js";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})
app.register(AppRoutes)

app.setErrorHandler((err, request, reply) => {
    if(err instanceof ZodError) {
        return reply.status(400).send({
            message: err.message,
            issues: err.format()
        })
    }

    return reply.status(500).send({
        message: 'Internal server error.'
    })
})



