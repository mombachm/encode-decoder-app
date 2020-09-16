import { Terminal } from "terminal-kit";
import { EncodingType } from "./EncodingType";

export abstract class Encoder {
    protected filePath: string;
    protected encodingType: EncodingType;
    protected fs = require("fs");
    protected path = require("path");
    protected term: Terminal = require( 'terminal-kit' ).terminal;
    protected bitString: any;

    constructor() {}

    public abstract encode(filepath: string): void
    public abstract decode(filepath: string): void

    protected readFileData(filepath: string): Array<string> {
        var stats = this.fs.statSync(filepath)
        var fileSizeInBytes = stats["size"];
        this.term.green(`Original file size: ${fileSizeInBytes} bytes\n`);
        return Array.from(this.fs.readFileSync(filepath, 'utf8'));
    }

    protected saveEncodedFileData(data: string, filepath: string) {
        const dirname = this.path.dirname(filepath)
        const filename = this.path.parse(filepath);
        const distFilepath = `${dirname}/${filename.name}.cod`;
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath)
        var fileSizeInBytes = stats["size"];
        this.term.green(`Encoded file size: ${fileSizeInBytes} bytes\n`);
    }

    protected saveDecodedFileData(data: string, filepath: string) {
        const dirname = this.path.dirname(filepath)
        const filename = this.path.parse(filepath);
        const distFilepath = `${dirname}/${filename.name}.dec`;
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath)
        var fileSizeInBytes = stats["size"]
        // this.term.green(`\n\n${data}\n\n`);
        this.term.green(`Decoded file size: ${fileSizeInBytes} bytes\n`);
    }

    protected byteStringToFixedSizeFromNumber(n: number) {
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + " does not fit in a byte");
        }
        return this.byteStringToFixedSizeZerosLeft(n.toString(2));
    }

    protected byteStringToFixedSize(byte: string) {
        if (byte.length < 8) {
            return byte + "0".repeat(8 - byte.length);
        }
        return byte;
    }

    protected byteStringToFixedSizeZerosLeft(byte: string) {
        if (byte.length < 8) {
            return "0".repeat(8 - byte.length) + byte;
        }
        return byte;
    }
}