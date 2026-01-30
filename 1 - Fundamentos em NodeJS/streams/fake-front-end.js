import { Readable } from 'node:stream';

class Streams extends Readable {
    index = 1; 
    
    _read() {
        const i = this.index++

        setTimeout(() => {
            if(i == 50) {
                this.push(null);
            } else {
                this.push(Buffer.from(String(i)));
            }
        }, 1000)
    }
}

fetch('http://localhost:8888', {
    method: 'POST',
    body: new Streams(),
    duplex: 'half'
})