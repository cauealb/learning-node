import type { FastifyInstance } from "fastify";
import { Register } from "./controller/register.controller.js";
import { Authenticate } from "./controller/authenticate.controller.js";

export async function AppRoutes(app: FastifyInstance) {
    app.post('/users', Register)
    app.post('/sessions', Authenticate);
}