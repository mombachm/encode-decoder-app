import { Encoder } from "./Encoder";

const fs = require("fs");
const path = require("path");

export class FibonnaciEncoder implements Encoder {
    private mod (val:number, n: number) {
        return ((val % n) + n) % n;
    };
      
    private readFileData(filepath: string): string {
        return fs.readFileSync(filepath).toString();
    }

    private saveEncodedFileData(data: string, filepath: string) {
        const dirname = path.dirname(filepath)
        const filename = path.parse(filepath);
        fs.writeFileSync(`${dirname}/${filename.name}-encoded`, data);
    }

    private saveDecodedFileData(data: string, filepath: string) {
        const dirname = path.dirname(filepath)
        const filename = path.parse(filepath);
        fs.writeFileSync(`${dirname}/${filename.name}-decoded`, data);
    }

    private execute(data: string, reverse=false, cycle=10): any {
        let sequence = this.fibonacci();    
        return Array.from(data).map((c: string, i) => {
            const fibonacciValue = Number(sequence.next(i % cycle === 0).value);
            let val = (
                c.charCodeAt(0) + (reverse ? -1 : 1) * fibonacciValue
            );
            // val = this.mod(val, 255);
            return val;
        }).map(n => String.fromCharCode(n))
        .join('');
    }

    public encode(filepath: string) {
        const data = this.readFileData(filepath);
        const dataEncoded = this.execute(data, false);
        this.saveEncodedFileData(dataEncoded, filepath);
    }

    public decode(filepath: string) {
        const data = this.readFileData(filepath);
        const dataDecoded = this.execute(data, true);
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