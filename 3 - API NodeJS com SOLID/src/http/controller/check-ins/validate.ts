import { MakeValidateCheckInUseCase } from "@/use-case/factories/make-validate-check-in-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
    const schemaValidateParams = z.object({
        checkInId: z.string(),
    })

    const { checkInId } = schemaValidateParams.parse(request.params)

    const validateUseCase = MakeValidateCheckInUseCase()

    await validateUseCase.execute({
        checkInId
    })

    return reply.status(204).send()
}