"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Encoder_1 = require("./Encoder");
var UnaryEncoder = /** @class */ (function (_super) {
    __extends(UnaryEncoder, _super);
    function UnaryEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnaryEncoder.prototype.encode = function (filepath) {
        var data = this.readFileData(filepath);
        var dataEncoded = this.executeEncoding(data);
        this.saveEncodedFileData(dataEncoded, filepath);
    };
    UnaryEncoder.prototype.decode = function (filepath) {
        var data = this.readFileData(filepath);
        var dataDecoded = this.executeDecoding(data);
        this.saveDecodedFileData(dataDecoded, filepath);
    };
    UnaryEncoder.prototype.executeEncoding = function (data) {
        var stringBuffer = "";
        Array.from(data).forEach(function (char) {
            if (char) {
                var charValue = char.charCodeAt(0);
                var binaryStringResult = "0".repeat(charValue).concat("1");
                stringBuffer += binaryStringResult;
            }
        });
        var encodingBuffer = "";
        for (var index = 0; index < stringBuffer.length - 1; index += 8) {
            var byteString = stringBuffer.substring(index, index + 8);
            var byteStringFixedSize = this.byteStringToFixedSize(byteString);
            var byteEncoded = parseInt(byteStringFixedSize, 2);
            encodingBuffer += String.fromCharCode(byteEncoded);
        }
        return encodingBuffer;
    };
    UnaryEncoder.prototype.executeDecoding = function (data) {
        var _this = this;
        var stringEncodedBuffer = "";
        data.forEach(function (encodedChar) {
            var charValue = encodedChar.charCodeAt(0);
            var binaryString = _this.byteStringToFixedSizeFromNumber(charValue);
            stringEncodedBuffer += binaryString;
        });
        stringEncodedBuffer = this.removeUnneededEndZeros(stringEncodedBuffer);
        var unaryArray = stringEncodedBuffer.split("1");
        var stringDecodedBuffer = "";
        unaryArray.forEach(function (unaryWord) {
            if (unaryWord) {
                stringDecodedBuffer += String.fromCharCode(unaryWord.length);
            }
        });
        return stringDecodedBuffer;
    };
    UnaryEncoder.prototype.removeUnneededEndZeros = function (stringBinaryBuffer) {
        if (stringBinaryBuffer.endsWith("0")) {
            return stringBinaryBuffer = this.removeUnneededEndZeros(stringBinaryBuffer.slice(0, -1));
        }
        return stringBinaryBuffer;
    };
    return UnaryEncoder;
}(Encoder_1.Encoder));
exports.UnaryEncoder = UnaryEncoder;
//# sourceMappingURL=UnaryEncoder.js.map