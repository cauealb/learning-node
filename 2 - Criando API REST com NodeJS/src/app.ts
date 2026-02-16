import fastify from "fastify";
import { TransactionRoutes } from "./routes/TransactionsRoutes.js";
import cookie from '@fastify/cookie';

export const app = fastify();

app.register(cookie);
app.register(TransactionRoutes, {
  prefix: 'transaction'                   
})