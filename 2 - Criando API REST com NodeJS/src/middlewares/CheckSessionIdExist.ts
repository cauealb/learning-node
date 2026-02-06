import type { FastifyReply, FastifyRequest } from "fastify";

export async function CheckSessionIdExist(request: FastifyRequest, replay: FastifyReply) {
    const { sessionId } = request.cookies;

    if (!sessionId) {
        replay.status(401).send({
            err: 'Unauthorized'
        })
    }
}