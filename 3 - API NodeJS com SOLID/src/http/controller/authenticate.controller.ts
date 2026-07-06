import { PrismaUserRepository } from "@/repositories/prisma-user-repository.js";
import { AuthenticaUseCase } from "@/use-case/authenticate.js";
import { InvalidCredentialError } from "@/use-case/errors/invalid-credential-error.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z, { email } from "zod";

export async function Authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const userRepository = new PrismaUserRepository()
        const useCase = new AuthenticaUseCase(userRepository);

        await useCase.execute({email, password});
    } catch(err) {
        if (err instanceof InvalidCredentialError) {
            reply.status(400).send()
        }
    }

    return reply.status(200).send()
}