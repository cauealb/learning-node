import { app } from "@/app.js";
import { prisma } from "@/lib/prisma.js";
import { createAndAuthenticaUser } from "@/utils/test/create-and-authenticate-user.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe("Create check-in (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able create a check-in", async () => {
        const { token } = await createAndAuthenticaUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'Test Gym',
                description: '',
                phone: '11999999999',
                latitude: -23.5064001,
                longitude: -46.759936
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -23.5064001,
                longitude: -46.759936
            })

        expect(response.statusCode).toEqual(201)
    })
})