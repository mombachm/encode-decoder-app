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
    Encoder.prototype.byteStringToFixedSizeFromNumber = function (n, size) {
        if (size === void 0) { size = 8; }
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + " does not fit in a byte");
        }
        return this.byteStringToFixedSizeZerosLeft(n.toString(2), size);
    };
    Encoder.prototype.byteStringToFixedSizeFromNumberZeroRight = function (n, size) {
        if (size === void 0) { size = 8; }
        if (n < 0 || n > 255 || n % 1 !== 0) {
            throw new Error(n + " does not fit in a byte");
        }
        return this.byteStringToFixedSizeZeroRight(n.toString(2), size);
    };
    Encoder.prototype.byteStringToFixedSizeZeroRight = function (byte, size) {
        if (size === void 0) { size = 8; }
        if (byte.length < size) {
            return byte + "0".repeat(size - byte.length);
        }
        return byte;
    };
    Encoder.prototype.byteStringToFixedSizeZerosLeft = function (byte, size) {
        if (size === void 0) { size = 8; }
        if (byte.length < size) {
            return "0".repeat(size - byte.length) + byte;
        }
        return byte;
    };
    return Encoder;
}());
exports.Encoder = Encoder;
//# sourceMappingURL=Encoder.js.map