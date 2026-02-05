import fastify from "fastify";
import { randomUUID } from 'node:crypto'
import { db } from "./database.js";
import { env } from "./env/index.js";

const app = fastify();

app.get('/transactions', async () => {
  const transactions = await db('transactions').select('*');

  return transactions;
})

app.post('/transactions', async () => {
  const transaction = await db('transactions').insert({
    id: randomUUID(),
    title: 'PIX',
    amount: 3000,
  }).returning('*')

  return transaction;
})

app.delete('/transactions', async () => {
  await db('transactions').where('id', 1).del()

  return 'Deletado com sucesso!'
})

app.listen({
  port: env.PORT

}).then(() => {
  console.log('Servidor restartado com sucesso!')
})