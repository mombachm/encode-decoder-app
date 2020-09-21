import { Encoder } from "./Encoder";
import { EncodingType } from "./EncodingType";

export class UnaryEncoder extends Encoder {

    public encode(filepath: string) {
        const dataEncoded = this.executeEncoding(this.inputData);
        const headerConfigs = {
            encodingType: EncodingType.Unary,
            divider: 0
        };
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
                const binaryStringResult = "0".repeat(charValue).concat("1");
                stringBuffer+=binaryStringResult;
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
        let stringEncodedBuffer = "";
        data.forEach((encodedChar: string) => {
            const charValue = encodedChar.charCodeAt(0); 
            const binaryString = this.byteStringToFixedSizeFromNumber(charValue);
            stringEncodedBuffer += binaryString;
        })
        stringEncodedBuffer = this.removeUnneededEndZeros(stringEncodedBuffer);    
        const unaryArray = stringEncodedBuffer.split("1");
        let stringDecodedBuffer = "";
        unaryArray.forEach(unaryWord => {
            if (unaryWord) {
                stringDecodedBuffer += String.fromCharCode(unaryWord.length);
            }
        });
        return stringDecodedBuffer;
    }

    private removeUnneededEndZeros(stringBinaryBuffer: string): string {
       if (stringBinaryBuffer.endsWith("0")) {
            return stringBinaryBuffer = this.removeUnneededEndZeros(stringBinaryBuffer.slice(0, -1));
       }
       return stringBinaryBuffer;
    }
}