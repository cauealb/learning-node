import { verifyJWT } from "@/middlewares/verify-jwt.js";
import type { FastifyInstance } from "fastify";
import { nearby } from "./nearby.js";
import { search } from "./search.js";
import { create } from "./create.js";

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/nearby', nearby)
    app.get('/gyms/search', search)

    app.post('/gyms', create)
}