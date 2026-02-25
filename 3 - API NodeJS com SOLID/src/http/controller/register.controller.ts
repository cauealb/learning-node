import { prisma } from "@/lib/prisma.js";
import { RegisterUseCase } from "@/use-case/register.js";
import { hash }  from 'bcryptjs'
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Register(request: FastifyRequest, replay: FastifyReply) {
    const requestBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(7)
    })
    
    const { name, email, password } = requestBodySchema.parse(request.body)

    try {
        await RegisterUseCase({ name, email, password })
    } catch (err) {
        return replay.status(409).send()
    }
    
    return replay.status(201).send()
}