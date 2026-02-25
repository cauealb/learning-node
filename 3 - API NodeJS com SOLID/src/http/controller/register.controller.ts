import { prisma } from "@/lib/prisma.js";
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

    const password_hash = await hash(password, 6);

    const findEmailWithSame = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (findEmailWithSame) {
        return replay.status(409).send()
    }
    
    await prisma.user.create({
        data: {
            name,
            email, 
            password_hash
        }
    })
    
    return replay.status(201).send()
}