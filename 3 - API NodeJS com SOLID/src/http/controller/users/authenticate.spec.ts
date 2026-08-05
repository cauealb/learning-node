import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { randomUUID } from 'node:crypto'

describe("Authenticate (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able authenticate", async () => {
        const email = `johndoe-${randomUUID()}@example.com`

        await request(app.server).post('/users').send({
            name: "John Doe",
            email,
            password: "1234211212",
        });

        const response = await request(app.server).post('/sessions').send({
            email,
            password: "1234211212",
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})
