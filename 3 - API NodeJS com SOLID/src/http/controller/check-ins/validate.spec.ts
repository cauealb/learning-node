import { app } from "@/app.js";
import { prisma } from "@/lib/prisma.js";
import { createAndAuthenticaUser } from "@/utils/test/create-and-authenticate-user.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe("Validate check-in", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able validate check-in", async () => {
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

        let checkin = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id
            }
        })

        const response = await request(app.server)
            .patch(`/check-ins/${checkin.id}/validate`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toEqual(204)

        checkin = await prisma.checkIn.findFirstOrThrow()

        expect(checkin.validated_at).toEqual(expect.any(Date))
    })
})