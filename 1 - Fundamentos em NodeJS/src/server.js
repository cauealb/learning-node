import http from 'node:http';

const server = http.createServer((req, res) => {
    
    const { method, url} = req;

    if(method === 'GET' && url === '/users') {
        return res.end("Buscou usuário");
    } 

    if(method === 'POST' && url === '/users') {
        return res.end("Criou Usuários")
    }

    return res.end("Hello Word")
});

server.listen(7777);