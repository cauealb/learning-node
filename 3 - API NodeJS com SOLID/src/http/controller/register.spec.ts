import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "@/app.js";

describe("Register (e2e)", () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it("should be able create a user", async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: "John Doe",
                email: "johndoe12@gmail.com",
                password: "1234211212",
            })

        expect(response.statusCode).toEqual(201)
    })
})