import type { FastifyInstance } from "fastify";
import { db } from "../database.js";
import { randomUUID } from "node:crypto";

export async function TransactionRoutes(app: FastifyInstance) {
    app.get('/transactions', async () => {
      const transactions = await db('transactions').select('*');
    
      return transactions;
    });

    app.post('/transactions', async () => {
        const transaction = await db('transactions').insert({
            id: randomUUID(),
            title: 'PIX',
            amount: 3000,
        }).returning('*')

        return transaction;
    });

    app.delete('/transactions', async () => {
    await db('transactions').where('id', 1).del()

    return 'Deletado com sucesso!'
    });
} 