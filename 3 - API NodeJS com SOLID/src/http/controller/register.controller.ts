import { prisma } from "@/lib/prisma.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Register(request: FastifyRequest, replay: FastifyReply) {
    const requestBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(7)
    })
    
    const { name, email, password } = requestBodySchema.parse(request.body)
    
    await prisma.user.create({
        data: {
            name,
            email, 
            password_hash: password
        }
    })
    
    return replay.status(201).send()
}