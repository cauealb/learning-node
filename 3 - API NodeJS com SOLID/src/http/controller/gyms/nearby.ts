import { MakeFetchNearbyGymsUseCase } from "@/use-case/factories/make-fetch-nearby-gyms-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const schemaNearbyQuery = z.object({
        latitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine(value => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = schemaNearbyQuery.parse(request.query)
    
    const nearbyGymsUseCase = MakeFetchNearbyGymsUseCase()
    
    const { gyms } = await nearbyGymsUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })
    
    reply.status(200).send(gyms)
}