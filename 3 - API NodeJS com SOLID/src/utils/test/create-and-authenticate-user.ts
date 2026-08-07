import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import request from 'supertest'

export async function createAndAuthenticaUser(app: FastifyInstance) {
    const email = `johndoe-${randomUUID()}@gmail.com`

    await request(app.server)
        .post('/users')
        .send({
            name: "John Doe",
            email,
            password: "1234211212",
        })

    const response = await request(app.server)
        .post('/sessions')
        .send({
            email,
            password: '1234211212'
        })

    const { token } = response.body

    return {
        token
    }
}