import { EncodingType, EncodingTypeIndex, EncodingTypeNamesMapping } from "../encoders/EncodingType";
import { Terminal } from "terminal-kit";

export interface HeaderConfigs {
    encodingType: EncodingType;
    divider: number;
}

export class FileIO {
    private fs = require("fs");
    private path = require("path");
    private term: Terminal = require( 'terminal-kit' ).terminal;
    private headerConfigs: HeaderConfigs;

    public readFileDataForEncoding(filepath: string): string[] {
        return this.readFileData(filepath);
    }

    public readFileDataForDecoding(filepath: string): string[] {
        const fileData = this.readFileData(filepath);
        this.loadHeaderConfigs(fileData);
        return fileData;
    }

    public saveEncodedFileData(data: string, filepath: string, headerConfigs: HeaderConfigs) {
        data = this.addHeaderConfigsIntoFileData(headerConfigs, data);
        const dirname = this.path.dirname(filepath)
        const filename = this.path.parse(filepath);
        const distFilepath = `${dirname}/${filename.name}.cod`;
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath)
        var fileSizeInBytes = stats["size"];
        this.term.brightCyan(`Encoded file size: ${fileSizeInBytes} bytes\n`);
        this.term.brightGreen("File encoded with success.\n");
        this.term.brightGreen(`Encoded file saved. Path: ${distFilepath}\n`);
    }

    public saveDecodedFileData(data: string, filepath: string) {
        const dirname = this.path.dirname(filepath)
        const filename = this.path.parse(filepath);
        const distFilepath = `${dirname}/${filename.name}.dec`;
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath)
        var fileSizeInBytes = stats["size"]
        // this.term.brightGreen(`\n\n${data}\n\n`);
        this.term.brightCyan(`Decoded file size: ${fileSizeInBytes} bytes\n`);
        this.term.brightGreen("File decoded with success.\n");
        this.term.brightGreen(`Decoded file saved. Path: ${distFilepath}\n`);
    }

    private readFileData(filepath: string): string[] {
        var stats = this.fs.statSync(filepath)
        var fileSizeInBytes = stats["size"];
        this.term.bold(`\nInput file size: ${fileSizeInBytes} bytes\n`);
        return Array.from(this.fs.readFileSync(filepath, 'utf8'));
    }

    private loadHeaderConfigs(fileData: string[]) {
        if (fileData.length < 2) {
            return;
        }
        let encodingType;
        let divider;
        try {
            encodingType = EncodingTypeNamesMapping[fileData[0].charCodeAt(0).toString()];
            divider = fileData[1].charCodeAt(0);
            this.headerConfigs = {
                encodingType,
                divider
            }
            fileData.shift();
            fileData.shift();
        } catch(error) {
            this.term.red(`Invalid header configuration: Encoding Type: ${encodingType}; Divider: ${divider}\n`);
        }
    }

    private addHeaderConfigsIntoFileData(headerConfigs: HeaderConfigs, fileData: string): string {
        const dividerByte = String.fromCharCode(headerConfigs.divider);
        const encodingTypeByte = String.fromCharCode(parseInt(EncodingTypeIndex[headerConfigs.encodingType]));
        return encodingTypeByte + dividerByte + fileData;
    }

    public getHeaderConfigs(): HeaderConfigs {
        return this.headerConfigs;
    }
}