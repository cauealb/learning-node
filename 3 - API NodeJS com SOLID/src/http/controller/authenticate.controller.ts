import { InvalidCredentialError } from "@/use-case/errors/invalid-credential-error.js";
import { makeAuthenticateUseCase } from "@/use-case/factories/make-authenticate-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z, { email } from "zod";

export async function Authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        await authenticateUseCase.execute({email, password});
    } catch(err) {
        if (err instanceof InvalidCredentialError) {
            reply.status(400).send()
        }
    }

    return reply.status(200).send()
}