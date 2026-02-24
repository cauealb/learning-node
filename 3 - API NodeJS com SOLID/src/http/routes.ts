import type { FastifyInstance } from "fastify";
import { Register } from "./controller/register.controller.js";

export async function AppRoutes(app: FastifyInstance) {
    app.post('/users', Register)
}