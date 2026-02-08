import { it, beforeAll, afterAll, describe, expect, beforeEach } from "vitest";
import request from 'supertest';
import { app } from "../app.js";
import { execSync } from 'node:child_process'

describe('Transaction routes', () => {

    beforeAll(async () => {
        await app.ready()
    })
    
    afterAll(async () => {
        await app.close()
    })
    
    beforeEach(() => {
        execSync('npm run knex -- migrate:rollback --all')
        execSync('npm run knex -- migrate:latest') 
    })

    it('Must be able to create a new transaction', async () => {
        await request(app.server)
            .post('/transaction')
            .send({
                title: "Desenvolvedor Full-Stack CLT",
                amount: 5000,
                type: "credit"
            })
            .expect(201)
    }) 

    it('Must be able to list all transactions', async () => {
        const responsePost = await request(app.server)
            .post('/transaction')
            .send({
                title: "Desenvolvedor Full-Stack CLT",
                amount: 5000,
                type: "credit"
            })


        const cookies = responsePost.get('Set-Cookie');

        const responseGet = await request(app.server)
            .get('/transaction')
            .set('Cookie', cookies!)
            .expect(200)

        expect(responseGet.body.transactions).toEqual([
            expect.objectContaining({
                title: "Desenvolvedor Full-Stack CLT",
                amount: 5000,
            })
        ])
    })

    it('Must be able to list only one transaction', async () => {
        const responsePost = await request(app.server)
            .post('/transaction')
            .send({
                title: 'New Transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookie = responsePost.get('Set-Cookie')
    
        const responseGetAllTransaction = await request(app.server)
            .get('/transaction')
            .set('Cookie', cookie!)

        const { id } = responseGetAllTransaction.body.transactions[0];

        const responseGetOneTransaction = await request(app.server)
            .get(`/transaction/${id}`)
            .set('Cookie', cookie!)

        expect(responseGetOneTransaction.body.transactions).toEqual(
            expect.objectContaining({
                title: "New Transaction",
                amount: 5000,
            })
        )
    })

    it('Must be able to list the summary', async () => {
        const responsePost = await request(app.server)
            .post('/transaction').send({
                title: "New Transaction",
                amount: 5000,
                type: "credit"
            })

        const cookie = responsePost.get('Set-Cookie');

        await request(app.server)
            .post('/transaction')
            .set('Cookie', cookie!)
            .send({
                title: "New Transaction",
                amount: 2000,
                type: "debit"
            })

        const responseSummary = await request(app.server)
            .get('/transaction/summary')
            .set('Cookie', cookie!)

        expect(responseSummary.body.summary).toEqual({
            amount: 3000
        })
    })

    it('Must be able to delete one transaction', async () => {
        const responsePost = await request(app.server)
            .post('/transaction')
            .send({
                title: "Desenvolvedor Full-Stack CLT",
                amount: 5000,
                type: "credit"
            })

        const cookie = responsePost.get('Set-Cookie');
        const responseGet = await request(app.server)
            .get('/transaction')
            .set('Cookie', cookie!)

        const { id } = responseGet.body.transactions[0];
        await request(app.server)
            .delete(`/transaction/${id}`)
            .set('Cookie', cookie!)
            .expect(204)
    })
})

