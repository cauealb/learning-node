import fastify from "fastify";
import { db } from "./database.js";

const app = fastify();

app.get('/hello', async () => {
  const result = await db('sqlite_schema').select('*');

  return result
})

app.listen({
  port: 3333

}).then(() => {
  console.log('Servidor restartado com sucesso!')
})