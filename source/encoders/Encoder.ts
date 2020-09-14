import { Terminal } from "terminal-kit";
import { EncodingType } from "./EncodingType";
const  BitString = require('bitstring');

export abstract class Encoder {
    protected filePath: string;
    protected encodingType: EncodingType;
    protected fs = require("fs");
    protected path = require("path");
    protected term: Terminal = require( 'terminal-kit' ).terminal;
    protected bitString: any;

    constructor() {
        this.bitString = new BitString();
    }

    public abstract encode(filepath: string): void
    public abstract decode(filepath: string): void

    protected readFileData(filepath: string): string {
        return this.fs.readFileSync(filepath).toString();
    }

    protected saveEncodedFileData(data: string, filepath: string) {
        const dirname = this.path.dirname(filepath)
        const filename = this.path.parse(filepath);
        const distFilepath = `${dirname}/${filename.name}.cod`;
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath)
        var fileSizeInBytes = stats["size"]
        this.term.green(`Encoded file size: ${fileSizeInBytes} bytes`);
    }

    protected saveDecodedFileData(data: string, filepath: string) {
        const dirname = this.path.dirname(filepath)
        const filename = this.path.parse(filepath);
        const distFilepath = `${dirname}/${filename.name}.dec`;
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath)
        var fileSizeInBytes = stats["size"]
        this.term.green(`Decoded file size: ${fileSizeInBytes} bytes`);
    }
}