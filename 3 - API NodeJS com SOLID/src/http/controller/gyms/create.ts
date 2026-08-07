import { MakeCreateGymUseCase } from "@/use-case/factories/make-create-gym-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const schemaGymsCreate = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const { title, description, phone, latitude, longitude } = schemaGymsCreate.parse(request.body);

    const gymsCreateUseCase = MakeCreateGymUseCase()

    await gymsCreateUseCase.execute({
        title: title, 
        description: description, 
        phone: phone, 
        latitude: latitude, 
        longitude: longitude
    })

    return reply.status(201).send()

}