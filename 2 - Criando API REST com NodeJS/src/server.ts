import fastify from "fastify";
import { env } from "./env/index.js";
import { TransactionRoutes } from "./routes/TransactionsRoutes.js";

const app = fastify();

app.register(TransactionRoutes)

app.listen({
  port: env.PORT

}).then(() => {
  console.log('Servidor restartado com sucesso!')
})