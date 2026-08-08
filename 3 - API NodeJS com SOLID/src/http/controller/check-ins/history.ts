import { MakeFetchUserCheckInHistoryUseCase } from "@/use-case/factories/make-fetch-user-check-ins-history-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
    const schemaHistoryBody = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = schemaHistoryBody.parse(request.query)
    const historyUseCase = MakeFetchUserCheckInHistoryUseCase()

    const { checkIns } = await historyUseCase.execute({
        userId: request.user.sub,
        page
    })

    return reply.status(200).send(checkIns)
}