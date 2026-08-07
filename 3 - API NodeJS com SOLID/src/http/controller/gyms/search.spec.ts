import { app } from "@/app.js";
import { createAndAuthenticaUser } from "@/utils/test/create-and-authenticate-user.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe("Search gym (e2e)", async () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able search a gym", async () => {
        const { token } = await createAndAuthenticaUser(app)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Javascript Gym',
                description: 'Some description',
                phone: '11999999999',
                latitude: -23.5064001,
                longitude: -46.759936
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Typescript Gym',
                description: 'Some description',
                phone: '11999999999',
                latitude: -23.5064001,
                longitude: -46.759936
            })

        const response = await request(app.server)
            .get('/gyms/search')
            .set('Authorization', `Bearer ${token}`)
            .query({
                q: 'Javascript'
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveLength(1)
        expect(response.body).toEqual([
            expect.objectContaining({
                title: 'Javascript Gym'
            })
        ])
    })
})
