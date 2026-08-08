import { MakeGetUserMetricsUseCase } from "@/use-case/factories/make-get-user-metrics-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
    const metricsUseCase = MakeGetUserMetricsUseCase()

    const count = await metricsUseCase.execute({
        userId: request.user.sub
    })

    return reply.status(200).send(count)
}