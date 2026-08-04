import type { FastifyInstance } from "fastify";
import { Register } from "./controller/register.controller.js";
import { Authenticate } from "./controller/authenticate.controller.js";
import { Profile } from "./controller/profile.controller.js";

export async function AppRoutes(app: FastifyInstance) {
    app.post('/users', Register)
    app.post('/sessions', Authenticate);

    app.get("/me", Profile)
}