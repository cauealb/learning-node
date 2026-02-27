import fastify from "fastify";
import { AppRoutes } from "./http/routes.js";
import { ZodError } from "zod";

export const app = fastify();

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