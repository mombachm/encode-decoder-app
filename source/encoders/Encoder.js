"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BitString = require('bitstring');
var Encoder = /** @class */ (function () {
    function Encoder() {
        this.fs = require("fs");
        this.path = require("path");
        this.term = require('terminal-kit').terminal;
        this.bitString = new BitString();
    }
    Encoder.prototype.readFileData = function (filepath) {
        return this.fs.readFileSync(filepath);
    };
    Encoder.prototype.saveEncodedFileData = function (data, filepath) {
        var dirname = this.path.dirname(filepath);
        var filename = this.path.parse(filepath);
        var distFilepath = dirname + "/" + filename.name + ".cod";
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath);
        var fileSizeInBytes = stats["size"];
        this.term.green("Encoded file size: " + fileSizeInBytes + " bytes");
    };
    Encoder.prototype.saveDecodedFileData = function (data, filepath) {
        var dirname = this.path.dirname(filepath);
        var filename = this.path.parse(filepath);
        var distFilepath = dirname + "/" + filename.name + ".dec";
        this.fs.writeFileSync(distFilepath, data);
        var stats = this.fs.statSync(distFilepath);
        var fileSizeInBytes = stats["size"];
        this.term.green("Decoded file size: " + fileSizeInBytes + " bytes");
    };
    Encoder.prototype.byteString = function (n) {
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + " does not fit in a byte");
        }
        return ("000000000" + n.toString(2)).substr(-8);
    };
    return Encoder;
}());
exports.Encoder = Encoder;
//# sourceMappingURL=Encoder.js.map