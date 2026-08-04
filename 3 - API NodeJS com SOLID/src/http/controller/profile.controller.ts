import { MakeGetUserProfileUseCases } from "@/use-case/factories/make-get-user-profile-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function Profile(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()

    const getUserProfile = MakeGetUserProfileUseCases()
    const { user } = await getUserProfile.execute({
        userId: request.user.sub
    })

    return reply.status(200).send(user)
}