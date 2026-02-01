import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { json } from './middleware/json.js';
import { DataBase } from './middleware/database.js';

const database = new DataBase();

const server = http.createServer(async(req, res) => {
    const { method, url} = req;

    await json(req, res);

    if(method === 'GET' && url === '/users') {
        const users = database.select('users');

        return res
            .end(JSON.stringify(users));
    } 

    if(method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        const user = {
            id: randomUUID(),
            name: name,
            email: email
        };

        database.insert('users', user);

        return res
            .writeHead(201)
            .end();
    }

    return res.writeHead(404).end("Erro na solicitação") 
});

server.listen(7777);