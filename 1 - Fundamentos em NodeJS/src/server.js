import http from 'node:http';

const users = [];

const server = http.createServer(async(req, res) => {
    const { method, url} = req;

    const buff = [];

    for await(const chunk of req) {
        buff.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buff).toString());
    } catch {
        req.body = null;
    }

    console.log(req.body)

    if(method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-type', 'application/json')
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