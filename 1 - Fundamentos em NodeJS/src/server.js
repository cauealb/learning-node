import http from 'node:http';

const server = http.createServer((req, res) => {
    return res.end('Hello Node!')
});

server.listen(7777);