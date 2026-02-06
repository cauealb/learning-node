import type { FastifyInstance } from "fastify";
import { db } from "../database.js";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export async function TransactionRoutes(app: FastifyInstance) {
    app.get('/', async () => {
      const transactions = await db('transactions').select('*');
      return transactions;
    });

    app.post('/', async (request, replay) => {
        const requestSchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type} = requestSchema.parse(request.body);

        await db('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1
        })

        return replay.status(201).send()
    });

    app.delete('/', async () => {
    await db('transactions').del()

    return 'Deletado com sucesso!'
    });
} 