import fastify from "fastify";
import { prisma } from "@/lib/prisma.js";

export const app = fastify();
// const user = await prisma.user