import fastify from "fastify";
import { usersRoutes } from "./http/controller/users/routes.js";
import { ZodError } from "zod";
import { env } from "./env/index.js";
import fastifyJwt from "@fastify/jwt";
import { gymsRoutes } from "./http/controller/gyms/routes.js";
import { checkInsRoutes } from "./http/controller/check-ins/routes.js";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})
app.register(usersRoutes)
app.register(checkInsRoutes)
app.register(gymsRoutes)

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



