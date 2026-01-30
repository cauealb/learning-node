import http from 'node:http';
import { Transform } from 'node:stream';


class TransformStreams extends Transform {
    _transform(chunk, encoding, callback) {
        const tranformed = Number(chunk.toString()) * 10;

        console.log(tranformed);

        callback(null, Buffer.from(String(tranformed)));
    }
}

const server = http.createServer((req, res) => {
    return req
        .pipe(new TransformStreams())
        .pipe(res)

})

server.listen(8888);