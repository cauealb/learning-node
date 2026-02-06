import fastify from "fastify";
import { env } from "./env/index.js";
import { TransactionRoutes } from "./routes/TransactionsRoutes.js";
import cookie from '@fastify/cookie';

const app = fastify();

app.register(cookie);
app.addHook('preHandler', async () => {
  console.log(`Olaaaaaaaaa`)
})

app.register(TransactionRoutes, {
  prefix: 'transaction'
})

app.get('/hello', async () => {
  return 'Hello'
})

app.listen({
  port: env.PORT

}).then(() => {
  console.log('Servidor restartado com sucesso!')
})