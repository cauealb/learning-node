import { test, beforeAll, afterAll } from "vitest";
import request from 'supertest';
import { app } from "../app.js";

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

test('The Test create a new transation', async () => {
    await request(app.server)
        .post('/transaction')
        .send({
            title: "Desenvolvedor Full-Stack CLT",
            amount: 5000,
            type: "credit"
        })
        .expect(201)
})