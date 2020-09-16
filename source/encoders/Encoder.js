"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileIO_1 = require("../io/FileIO");
var Encoder = /** @class */ (function () {
    function Encoder(inputData) {
        this.fs = require("fs");
        this.path = require("path");
        this.term = require('terminal-kit').terminal;
        this.inputData = inputData;
        this.fileIO = new FileIO_1.FileIO();
    }
    Encoder.prototype.saveEncodedFileData = function (data, filepath, headerConfigs) {
        return this.fileIO.saveEncodedFileData(data, filepath, headerConfigs);
    };
    Encoder.prototype.saveDecodedFileData = function (data, filepath) {
        return this.fileIO.saveDecodedFileData(data, filepath);
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