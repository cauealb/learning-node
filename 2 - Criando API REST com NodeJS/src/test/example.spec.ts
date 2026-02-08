import { it, beforeAll, afterAll, describe } from "vitest";
import request from 'supertest';
import { app } from "../app.js";

describe('Transaction routes', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Must be able to create a new  transaction', async () => {
        await request(app.server)
            .post('/transaction')
            .send({
                title: "Desenvolvedor Full-Stack CLT",
                amount: 5000,
                type: "credit"
            })
            .expect(201)
    })
})

