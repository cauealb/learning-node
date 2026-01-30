import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {
    const { method, url} = req;

    if(method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    } 

    if(method === 'POST' && url === '/users') {
        users.push({
            name: 'Cauê',
            email: 'cauealvesb4@gmail.com'
        });

        return res
            .setHeader('Content-type', 'application/json')
            .end("Usuarios criado com sucesso!");
    }

    return res.end("Hello Word") 
});

server.listen(7777);