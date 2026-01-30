import { Readable, Writable, Transform } from 'node:stream';

class ReadStreams extends Readable {
    index = 0;

    _read() {
        const str = 'Olá Node, estou usando Streams para ler dados e já manipular aos poucos!';
        
        setTimeout(() => {
            if(str[this.index] === '!') {
                this.push(null);
            } else {

                const buf = Buffer.from(str[this.index++]);
                this.push(buf)
            }
                
        }, 1000)

    }
}

class TransformStreams extends Transform {
    _transform(chunk, encoding, callback) {
        let str = chunk.toString().toUpperCase();

        callback(null, Buffer.from(str));
    }
}

class WriteStreams extends Writable {
    _write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
    
}

new ReadStreams()
    .pipe(new TransformStreams())
    .pipe(new WriteStreams());