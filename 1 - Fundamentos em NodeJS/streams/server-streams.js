import http from 'node:http';
import { Transform } from 'node:stream';


class TransformStreams extends Transform {
    _transform(chunk, encoding, callback) {
        const tranformed = Number(chunk.toString()) * 10;

        console.log(tranformed);

        callback(null, Buffer.from(String(tranformed)));
    }
}

const server = http.createServer(async (req, res) => {
    const buffs = [];

    for await (const chunk of req) {
        buffs.push(chunk);
    }

    const result = Buffer.concat(buffs).toString();
    console.log(result);

    return res.end(result)
})

server.listen(8888);