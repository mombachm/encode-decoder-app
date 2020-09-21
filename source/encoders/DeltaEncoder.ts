import { Encoder } from "./Encoder";
import { EncodingType } from "./EncodingType";

export class DeltaEncoder extends Encoder {

    public encode(filepath: string) {
        const dataEncoded = this.executeEncoding(this.inputData);
        const headerConfigs = {
            encodingType: EncodingType.Delta,
            divider: 0
        };
        this.saveEncodedFileData(dataEncoded, filepath, headerConfigs);
    }

    public decode(filepath: string) {
        const dataDecoded = this.executeDecoding(this.inputData);
        this.saveDecodedFileData(dataDecoded, filepath);
    }

    private executeEncoding(data: string[]): string {
        let encodingBuffer = "";
        let last = 0;
        for (let index=0; index < data.length; index+=1) {
            const current = data[index].charCodeAt(0);
            const byteEncoded = current - last;
            last = current;
            encodingBuffer += String.fromCharCode(byteEncoded);
        }
        return encodingBuffer;
    }

    private executeDecoding(data: string[]): string {
        let stringDecodedBuffer = "";
        let last = 0;
        for (let index=0; index < data.length; index+=1) {
            const delta = data[index].charCodeAt(0);
            const byteDecoded = delta + last;
            last = byteDecoded;
            stringDecodedBuffer += String.fromCharCode(byteDecoded);
        }
        return stringDecodedBuffer;
    }
}