"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Encoder = /** @class */ (function () {
    function Encoder() {
        this.fs = require("fs");
        this.path = require("path");
        this.term = require('terminal-kit').terminal;
    }
    Encoder.prototype.readFileData = function (filepath) {
        var stats = this.fs.statSync(filepath);
        var fileSizeInBytes = stats["size"];
        this.term.green("Original file size: " + fileSizeInBytes + " bytes\n");
        return Array.from(this.fs.readFileSync(filepath, 'utf8'));
    };
    Encoder.prototype.saveEncodedFileData = function (data, filepath) {
        var dirname = this.path.dirname(filepath);
        var filename = this.path.parse(filepath);
        var distFilepath = dirname + "/" + filename.name + ".cod";
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath);
        var fileSizeInBytes = stats["size"];
        this.term.green("Encoded file size: " + fileSizeInBytes + " bytes\n");
    };
    Encoder.prototype.saveDecodedFileData = function (data, filepath) {
        var dirname = this.path.dirname(filepath);
        var filename = this.path.parse(filepath);
        var distFilepath = dirname + "/" + filename.name + ".dec";
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath);
        var fileSizeInBytes = stats["size"];
        // this.term.green(`\n\n${data}\n\n`);
        this.term.green("Decoded file size: " + fileSizeInBytes + " bytes\n");
    };
    Encoder.prototype.byteStringToFixedSizeFromNumber = function (n) {
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + " does not fit in a byte");
        }
        return this.byteStringToFixedSizeZerosLeft(n.toString(2));
    };
    Encoder.prototype.byteStringToFixedSize = function (byte) {
        if (byte.length < 8) {
            return byte + "0".repeat(8 - byte.length);
        }
        return byte;
    };
    Encoder.prototype.byteStringToFixedSizeZerosLeft = function (byte) {
        if (byte.length < 8) {
            return "0".repeat(8 - byte.length) + byte;
        }
        return byte;
    };
    return Encoder;
}());
exports.Encoder = Encoder;
//# sourceMappingURL=Encoder.js.map