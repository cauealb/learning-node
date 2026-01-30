import { Readable } from 'node:stream';

class Streams extends Readable {
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

new Streams().pipe(process.stdout)