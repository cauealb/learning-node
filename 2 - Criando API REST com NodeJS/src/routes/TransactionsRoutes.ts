import type { FastifyInstance } from "fastify";
import { db } from "../database.js";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export async function TransactionRoutes(app: FastifyInstance) {
    app.get('/', async () => {
      const transactions = await db('transactions').select();
      return { transactions };
    });

    app.get('/:id', async (request) => {
        const requestSchema = z.object({ id: z.string().uuid() })
        const { id } = requestSchema.parse(request.params);

        const transactions = await db('transactions').where('id', id).first()
        return { transactions }
    })

    app.get('/summary', async () => {
        const summay = await db('transactions').sum('amount', { as: 'amount' }).first();
        return { summay }
    })

    app.post('/', async (request, replay) => {
        const requestSchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type} = requestSchema.parse(request.body);

        let sessionId = request.cookies.sessionId;

        if (!sessionId) {
            sessionId = randomUUID();

            replay.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 dias
            })
        }

        await db('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId
        })

        return replay.status(201).send()
    });

    app.delete('/:id', async (request, replay) => {
        const paramsSchema = z.object({ id: z.string().uuid() })
        const { id } = paramsSchema.parse(request.params)

        await db('transactions').where('id', id).del()
        return replay.status(204).send()
    });
} 