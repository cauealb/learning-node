import { RegisterUseCase } from "@/use-case/register.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Register(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(7)
    })
    
    const { name, email, password } = requestBodySchema.parse(request.body)

    try {
        await RegisterUseCase({ name, email, password })
    } catch (err) {
        return reply.status(409).send()
    }
    
    return reply.status(201).send()
}