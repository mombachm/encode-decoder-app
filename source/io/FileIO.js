"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EncodingType_1 = require("../encoders/EncodingType");
var FileIO = /** @class */ (function () {
    function FileIO() {
        this.fs = require("fs");
        this.path = require("path");
        this.term = require('terminal-kit').terminal;
    }
    FileIO.prototype.readFileDataForEncoding = function (filepath) {
        return this.readFileData(filepath);
    };
    FileIO.prototype.readFileDataForDecoding = function (filepath) {
        var fileData = this.readFileData(filepath);
        this.loadHeaderConfigs(fileData);
        return fileData;
    };
    FileIO.prototype.saveEncodedFileData = function (data, filepath, headerConfigs) {
        data = this.addHeaderConfigsIntoFileData(headerConfigs, data);
        var dirname = this.path.dirname(filepath);
        var filename = this.path.parse(filepath);
        var distFilepath = dirname + "/" + filename.name + ".cod";
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath);
        var fileSizeInBytes = stats["size"];
        this.term.brightCyan("Encoded file size: " + fileSizeInBytes + " bytes\n");
        this.term.brightGreen("File encoded with success.\n");
        this.term.brightGreen("Encoded file saved. Path: " + distFilepath + "\n");
    };
    FileIO.prototype.saveDecodedFileData = function (data, filepath) {
        var dirname = this.path.dirname(filepath);
        var filename = this.path.parse(filepath);
        var distFilepath = dirname + "/" + filename.name + ".dec";
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath);
        var fileSizeInBytes = stats["size"];
        // this.term.brightGreen(`\n\n${data}\n\n`);
        this.term.brightCyan("Decoded file size: " + fileSizeInBytes + " bytes\n");
        this.term.brightGreen("File decoded with success.\n");
        this.term.brightGreen("Decoded file saved. Path: " + distFilepath + "\n");
    };
    FileIO.prototype.readFileData = function (filepath) {
        var stats = this.fs.statSync(filepath);
        var fileSizeInBytes = stats["size"];
        this.term.bold("Input file size: " + fileSizeInBytes + " bytes\n");
        return Array.from(this.fs.readFileSync(filepath, 'utf8'));
    };
    FileIO.prototype.loadHeaderConfigs = function (fileData) {
        if (fileData.length < 2) {
            return;
        }
        var encodingType;
        var divider;
        try {
            encodingType = EncodingType_1.EncodingTypeNamesMapping[fileData[0].charCodeAt(0).toString()];
            divider = fileData[1].charCodeAt(0);
            this.headerConfigs = {
                encodingType: encodingType,
                divider: divider
            };
            fileData.shift();
            fileData.shift();
        }
        catch (error) {
            this.term.red("Invalid header configuration: Encoding Type: " + encodingType + "; Divider: " + divider + "\n");
        }
    };
    FileIO.prototype.addHeaderConfigsIntoFileData = function (headerConfigs, fileData) {
        var dividerByte = String.fromCharCode(headerConfigs.divider);
        var encodingTypeByte = String.fromCharCode(parseInt(EncodingType_1.EncodingTypeIndex[headerConfigs.encodingType]));
        return encodingTypeByte + dividerByte + fileData;
    };
    FileIO.prototype.getHeaderConfigs = function () {
        return this.headerConfigs;
    };
    return FileIO;
}());
exports.FileIO = FileIO;
//# sourceMappingURL=FileIO.js.map