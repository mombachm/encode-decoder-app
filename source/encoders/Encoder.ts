import { FileIO, HeaderConfigs } from "../io/FileIO";
import { Terminal } from "terminal-kit";
import { EncodingType } from "./EncodingType";

export abstract class Encoder {
    protected filePath: string;
    protected encodingType: EncodingType;
    protected fs = require("fs");
    protected path = require("path");
    protected term: Terminal = require( 'terminal-kit' ).terminal;
    protected bitString: any;
    protected fileIO: FileIO;
    protected inputData: string[];

    constructor(inputData: string[]) {
        this.inputData = inputData;
        this.fileIO = new FileIO();
    }

    public abstract encode(filepath: string): void
    public abstract decode(filepath: string): void
    
    protected saveEncodedFileData(data: string, filepath: string, headerConfigs: HeaderConfigs) {
        return this.fileIO.saveEncodedFileData(data, filepath, headerConfigs);
    }

    protected saveDecodedFileData(data: string, filepath: string) {
        return this.fileIO.saveDecodedFileData(data, filepath);
    }

    protected byteStringToFixedSizeFromNumber(n: number, size: number = 8) {
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + " does not fit in a byte");
        }
        return this.byteStringToFixedSizeZerosLeft(n.toString(2), size);
    }

    protected byteStringToFixedSizeFromNumberZeroRight(n: number, size: number = 8) {
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + " does not fit in a byte");
        }
        return this.byteStringToFixedSizeZeroRight(n.toString(2), size);
    }

    protected byteStringToFixedSizeZeroRight(byte: string, size: number = 8) {
        if (byte.length < size) {
            return byte + "0".repeat(size - byte.length);
        }
        return byte;
    }

    protected byteStringToFixedSizeZerosLeft(byte: string, size: number = 8) {
        if (byte.length < size) {
            return "0".repeat(size - byte.length) + byte;
        }
        return byte;
    }
}