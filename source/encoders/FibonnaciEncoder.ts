import { Encoder } from "./Encoder";

export class FibonnaciEncoder extends Encoder {

    private executeEncoding(data: string, reverse=false, cycle=10): any {
        let sequence = this.fibonacci();    
        return Array.from(data).map((c: string, i) => {
            const fibonacciValue = Number(sequence.next(i % cycle === 0).value);
            let val = c.charCodeAt(0) + (reverse ? -1 : 1) * fibonacciValue;
            return val;
        }).map(n => String.fromCharCode(n))
        .join('');
    }

    public encode(filepath: string) {
        const data = this.readFileData(filepath);
        const dataEncoded = this.executeEncoding(data, false);
        this.saveEncodedFileData(dataEncoded, filepath);
    }

    public decode(filepath: string) {
        const data = this.readFileData(filepath);
        const dataDecoded = this.executeEncoding(data, true);
        this.saveDecodedFileData(dataDecoded, filepath);
    }

    *fibonacci () {
        let fn1 = 0;
        let fn2 = 1;
        while (true) {  
            var current = fn1;
            fn1 = fn2;
            fn2 = current + fn1;
            var reset = yield current;
            if (reset) {
                fn1 = 0;
                fn2 = 1;
            }
        }
    }
}