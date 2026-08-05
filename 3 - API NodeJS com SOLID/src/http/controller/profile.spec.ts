import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { randomUUID } from "node:crypto";

describe("Profile (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able view me", async () => {
        const email = `johndoe${randomUUID()}@gmail.com`

        await request(app.server).post('/users').send({
            name: "John Doe",
            email,
            password: "1234211212",
        })

        const authUser = await request(app.server).post('/sessions').send({
            email,
            password: "1234211212",
        })

        const { token } = authUser.body

        const response = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(expect.objectContaining({
            email
        }))
    })
})