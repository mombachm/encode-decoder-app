import { Encoder } from "./Encoder";
import { EncodingType } from "./EncodingType";

export class EliasGammaEncoder extends Encoder {

    public encode(filepath: string) {
        const headerConfigs = {
            encodingType: EncodingType.EliasGamma,
            divider: 0
        };
        const dataEncoded = this.executeEncoding(this.inputData);
        this.saveEncodedFileData(dataEncoded, filepath, headerConfigs);
    }

    public decode(filepath: string) {
        const dataDecoded = this.executeDecoding(this.inputData);
        this.saveDecodedFileData(dataDecoded, filepath);
    }

    private executeEncoding(data: string[]): string {
        let stringBuffer = "";
        Array.from(data).forEach((char: string) => {
            if (char) {
                const charValue = char.charCodeAt(0); 
                const n = Math.floor(Math.log2(charValue));
                const remainder = charValue - Math.pow(2, n);
                let remainderBinary;
                remainderBinary = this.byteStringToFixedSizeFromNumber(remainder, n);
                const nUnary = "0".repeat(n).concat("1");
                stringBuffer+=nUnary.concat(remainderBinary);
            }
        })
        let encodingBuffer = "";
        for (let index=0; index < stringBuffer.length; index+=8) {
            const byteString = stringBuffer.substring(index, index+8);
            const byteStringFixedSize = this.byteStringToFixedSizeZeroRight(byteString);
            let byteEncoded = parseInt(byteStringFixedSize,2);
            encodingBuffer += String.fromCharCode(byteEncoded);
        }
        return encodingBuffer;
    }

    private executeDecoding(data: string[]): string {
        let stringEncodedBuffer = "";
        data.forEach((encodedChar: string) => {
            const charValue = encodedChar.charCodeAt(0); 
            const binaryString = this.byteStringToFixedSizeFromNumber(charValue);
            stringEncodedBuffer += binaryString;
        })
        let stringDecodedBuffer = "";
        let unaryCounter = 0;
        for (let index=0; index < stringEncodedBuffer.length; index+=1) {
            if (stringEncodedBuffer[index] === "1") {
                const n = unaryCounter;
                const remainderIndex = index + 1;
                let remainderBitString = stringEncodedBuffer.substring(remainderIndex, remainderIndex + n);
                let remainder = parseInt(remainderBitString, 2);
                const decodedValue = Math.pow(2,n) + remainder;
                index = remainderIndex + n;
                unaryCounter = 0;
                stringDecodedBuffer += String.fromCharCode(decodedValue);
            }
            unaryCounter++;
        }
        return stringDecodedBuffer;
    }
}