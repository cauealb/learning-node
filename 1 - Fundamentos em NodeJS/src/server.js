import http from 'node:http';
import { json } from './middleware/json.js';

const users = [];

const server = http.createServer(async(req, res) => {
    const { method, url} = req;

    await json(req, res);

    console.log(req.body)

    if(method === 'GET' && url === '/users') {
        return res
            .end(JSON.stringify(users));
    } 

    if(method === 'POST' && url === '/users') {
        const { name, email } = req.body;

        users.push({
            name: name,
            email: email
        });

        return res
            .writeHead(201)
            .end();
    }

    return res.writeHead(404).end("Erro na solicitação") 
});

server.listen(7777);