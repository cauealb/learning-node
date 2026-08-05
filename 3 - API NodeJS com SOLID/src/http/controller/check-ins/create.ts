import { MakeCheckInUseCase } from "@/use-case/factories/make-check-in-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const schemaGymsIdParams = z.object({
        gymId: z.string()
    })

    const schemaCreateGymsBody = z.object({
        latitude: z.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const { gymId } = schemaGymsIdParams.parse(request.params)
    const { latitude, longitude } = schemaCreateGymsBody.parse(request.body)

    const createGymsUseCase = MakeCheckInUseCase()

    const { checkIn } = await createGymsUseCase.execute({
        gymId: gymId,
        userId: request.user.sub,
        userLatitude: latitude,
        userLongitude: longitude
    })

    return reply.status(201).send(checkIn)
}