import { Readable, Writable } from 'node:stream';

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

class WriteStreams extends Writable {
    _write(chunk, enconding, callback) {
        console.log(chunk.toString().toUpperCase());
        callback();
    }
    
}

new ReadStreams()
    .pipe(new WriteStreams());