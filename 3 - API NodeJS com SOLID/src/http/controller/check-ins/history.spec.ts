import { app } from "@/app.js";
import { prisma } from "@/lib/prisma.js";
import { createAndAuthenticaUser } from "@/utils/test/create-and-authenticate-user.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe("History check-ins", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able view history check-ins", async () => {
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

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
            ]
        })

        const response = await request(app.server)
            .get('/check-ins/history')
            .set('Authorization', `Bearer ${token}`)
    
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id
            })
        ])
    })
})