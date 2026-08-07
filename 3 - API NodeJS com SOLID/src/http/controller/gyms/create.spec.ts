import { app } from "@/app.js";
import { createAndAuthenticaUser } from "@/utils/test/create-and-authenticate-user.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe("Create gym (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able create a gym", async () => {
        const { token } = await createAndAuthenticaUser(app)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Javascript Gym',
                description: 'Some description',
                phone: '11999999999',
                latitude: -23.5064001,
                longitude: -46.759936
            })

        expect(response.statusCode).toEqual(201)
    })
})