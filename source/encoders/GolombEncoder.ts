import { HeaderConfigs } from "source/io/FileIO";
import { Encoder } from "./Encoder";
import { EncodingType } from "./EncodingType";

export class GolombEncoder extends Encoder {

    constructor(private data: string[], private divider: number) {
        super(data);
    }

    public encode(filepath: string) {
        const headerConfigs = {
            encodingType: EncodingType.Golomb,
            divider: this.divider
        };
        const dataEncoded = this.executeEncoding(this.inputData);
        this.saveEncodedFileData(dataEncoded, filepath, headerConfigs);
    }

    public decode(filepath: string) {
        const dataDecoded = this.executeDecoding(this.inputData);
        this.saveDecodedFileData(dataDecoded, filepath);
    }

    private executeEncoding(data: string[]): string {
        const divider = this.divider;
        let stringBuffer = "";
        Array.from(data).forEach((char: string) => {
            if (char) {
                const charValue = char.charCodeAt(0); 
                const quocient = Math.floor(charValue / divider);
                const remainder = charValue - quocient*divider;
                const k = Math.ceil(Math.log2(divider));
                const c = Math.pow(2, k) - divider;
                let resultRemainder;
                let remainderUnary;
                if (remainder < c) {
                    resultRemainder = remainder;
                    remainderUnary = this.byteStringToFixedSizeFromNumber(resultRemainder, k-1);
                } else {
                    resultRemainder = remainder + c;
                    remainderUnary = this.byteStringToFixedSizeFromNumber(resultRemainder, k);
                }
                const quocientUnary = "1".repeat(quocient).concat("0");
                stringBuffer+=quocientUnary.concat(remainderUnary);
            }
        })
        let encodingBuffer = "";
        for (let index=0; index < stringBuffer.length - 1; index+=8) {
            const byteString = stringBuffer.substring(index, index+8);
            const byteStringFixedSize = this.byteStringToFixedSizeZerosLeft(byteString);
            let byteEncoded = parseInt(byteStringFixedSize,2);
            encodingBuffer += String.fromCharCode(byteEncoded);
        }
        return encodingBuffer;
    }

    private executeDecoding(data: string[]): string {
        const divider = this.divider;
        let stringEncodedBuffer = "";
        data.forEach((encodedChar: string) => {
            const charValue = encodedChar.charCodeAt(0); 
            const binaryString = this.byteStringToFixedSizeFromNumber(charValue);
            stringEncodedBuffer += binaryString;
        })
        stringEncodedBuffer = this.removeUnneededEndZeros(stringEncodedBuffer);    
        let stringDecodedBuffer = "";

        let unaryCounter = 0;
        for (let index=0; index < stringEncodedBuffer.length - 1; index+=1) {
            if (stringEncodedBuffer[index] === "0") {
                const quocient = unaryCounter;
                const k = Math.ceil(Math.log2(divider));
                const c = Math.pow(2, k) - divider;
                const remainderIndex = index + 1;
                let remainderBitString = stringEncodedBuffer.substring(remainderIndex, remainderIndex + k-1);
                let remainder = parseInt(remainderBitString, 2);
                let decodedValue;
                if (remainder < c) {
                    decodedValue = quocient*divider + remainder;
                    index = remainderIndex + k - 1;
                } else {
                    remainderBitString = stringEncodedBuffer.substring(remainderIndex, remainderIndex + k);
                    remainder = parseInt(remainderBitString, 2);
                    decodedValue = quocient*divider + remainder - c;
                    index = remainderIndex + k;
                }
                unaryCounter = 0;
                stringDecodedBuffer += String.fromCharCode(decodedValue);
            }

            unaryCounter++;
        }
        return stringDecodedBuffer;
    }

    private removeUnneededEndZeros(stringBinaryBuffer: string): string {
       if (stringBinaryBuffer.endsWith("0")) {
            return stringBinaryBuffer = this.removeUnneededEndZeros(stringBinaryBuffer.slice(0, -1));
       }
       return stringBinaryBuffer;
    }
}