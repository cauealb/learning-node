import { MakeSearchGymsUseCase } from "@/use-case/factories/make-search-gyms-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const schemaQuerySearchGyms = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { q, page } = schemaQuerySearchGyms.parse(request.query)

    const searchGymsUseCase = MakeSearchGymsUseCase()

    const { gyms } = await searchGymsUseCase.execute({
        query: q,
        page
    })

    reply.status(201).send(gyms)
}