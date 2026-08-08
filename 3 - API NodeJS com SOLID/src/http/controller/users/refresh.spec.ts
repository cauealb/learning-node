import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app.js";
import { randomUUID } from "node:crypto";

describe("Refresh token (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able refresh token", async () => {
        const email = `johdoe-${randomUUID()}@gmail.com`

        await request(app.server)
            .post('/users')
            .send({
                name: 'Cauê',
                email,
                password: "1234567"
            })

        const authResponse = await request(app.server)
            .post('/sessions')
            .send({
                email,
                password: "1234567",
            })

        const cookies = authResponse.get('Set-Cookie')

        console.log(cookies)
        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies!)

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining("refreshToken=")
        ])

    })
})