import fastify from "fastify";
import { AppRoutes } from "./http/routes.js";

export const app = fastify();

app.register(AppRoutes)