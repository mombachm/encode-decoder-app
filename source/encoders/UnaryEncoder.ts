import { StringDecoder } from "string_decoder";
import { Encoder } from "./Encoder";
const  BitString = require('bitstring');

export class UnaryEncoder extends Encoder {

    private executeEncoding(data: Buffer): string {
        let stringBuffer = "";
        Array.from(data).forEach((char: number) => {
            const binaryStringResult = "0".repeat(char).concat("1");
            stringBuffer+=binaryStringResult;
        })
        let encodingBuffer = "";
        for (let index=0; index < stringBuffer.length-1; index+=8) {
            let byteEncoded = parseInt(stringBuffer.substring(index,index+8),2);
            encodingBuffer += String.fromCharCode(byteEncoded);
        }
        return encodingBuffer;
    }

    private executeDecoding(data: Buffer): string {
        let stringEncodedBuffer = "";
        data.forEach((encodedChar: number) => {
            const binaryString = this.byteString(encodedChar);
            stringEncodedBuffer += binaryString;
        })
        const unaryArray = stringEncodedBuffer.split("1");        
        let stringDecodedBuffer = "";
        unaryArray.forEach(unaryWord => {
            stringDecodedBuffer = stringDecodedBuffer.concat(String.fromCharCode(unaryWord.length))
        });
        console.log(stringDecodedBuffer.toString());
        return stringDecodedBuffer.toString();
    }

    public encode(filepath: string) {
        const data = this.readFileData(filepath);
        const dataEncoded = this.executeEncoding(data);
        this.saveEncodedFileData(dataEncoded, filepath);
    }

    public decode(filepath: string) {
        const data = this.readFileData(filepath);
        const dataDecoded = this.executeDecoding(data);
        this.saveDecodedFileData(dataDecoded, filepath);
    }
}