import { app } from "@/app.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe("Authenticate (e2e)", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able authenticate", async () => {
        await request(app.server).post('/users').send({
            name: "John Doe",
            email: "johndoe12@gmail.com",
            password: "1234211212",
        });

        const response = await request(app.server).post('/sessions').send({
            email: "johndoe12@gmail.com",
            password: "1234211212",
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})