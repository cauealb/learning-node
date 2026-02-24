import fastify from "fastify";
import { email, z } from 'zod'
import { prisma } from "@/lib/prisma.js";

export const app = fastify();


app.post('/users',  async (request, replay) => {
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
})