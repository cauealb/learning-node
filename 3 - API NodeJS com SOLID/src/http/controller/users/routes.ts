import type { FastifyInstance } from "fastify";
import { Register } from "./register.controller.js";
import { Authenticate } from "./authenticate.controller.js";
import { Profile } from "./profile.controller.js";
import { verifyJWT } from "@/middlewares/verify-jwt.js";
import { refresh } from "./refresh.controller.js";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', Register)
    app.post('/sessions', Authenticate);

    app.patch('/token/refresh', refresh)

    app.get("/me", { onRequest: [verifyJWT] }, Profile)
}