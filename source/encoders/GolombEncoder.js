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
var EncodingType_1 = require("./EncodingType");
var GolombEncoder = /** @class */ (function (_super) {
    __extends(GolombEncoder, _super);
    function GolombEncoder(data, divider) {
        var _this = _super.call(this, data) || this;
        _this.data = data;
        _this.divider = divider;
        return _this;
    }
    GolombEncoder.prototype.encode = function (filepath) {
        var headerConfigs = {
            encodingType: EncodingType_1.EncodingType.Golomb,
            divider: this.divider
        };
        var dataEncoded = this.executeEncoding(this.inputData);
        this.saveEncodedFileData(dataEncoded, filepath, headerConfigs);
    };
    GolombEncoder.prototype.decode = function (filepath) {
        var dataDecoded = this.executeDecoding(this.inputData);
        this.saveDecodedFileData(dataDecoded, filepath);
    };
    GolombEncoder.prototype.executeEncoding = function (data) {
        var _this = this;
        var divider = this.divider;
        var stringBuffer = "";
        Array.from(data).forEach(function (char) {
            if (char) {
                var charValue = char.charCodeAt(0);
                var quocient = Math.floor(charValue / divider);
                var remainder = charValue - quocient * divider;
                var k = Math.ceil(Math.log2(divider));
                var c = Math.pow(2, k) - divider;
                var resultRemainder = void 0;
                var remainderUnary = void 0;
                if (remainder < c) {
                    resultRemainder = remainder;
                    remainderUnary = _this.byteStringToFixedSizeFromNumber(resultRemainder, k - 1);
                }
                else {
                    resultRemainder = remainder + c;
                    remainderUnary = _this.byteStringToFixedSizeFromNumber(resultRemainder, k);
                }
                var quocientUnary = "1".repeat(quocient).concat("0");
                stringBuffer += quocientUnary.concat(remainderUnary);
            }
        });
        var encodingBuffer = "";
        for (var index = 0; index < stringBuffer.length - 1; index += 8) {
            var byteString = stringBuffer.substring(index, index + 8);
            var byteStringFixedSize = this.byteStringToFixedSizeZerosLeft(byteString);
            var byteEncoded = parseInt(byteStringFixedSize, 2);
            encodingBuffer += String.fromCharCode(byteEncoded);
        }
        return encodingBuffer;
    };
    GolombEncoder.prototype.executeDecoding = function (data) {
        var _this = this;
        var divider = this.divider;
        var stringEncodedBuffer = "";
        data.forEach(function (encodedChar) {
            var charValue = encodedChar.charCodeAt(0);
            var binaryString = _this.byteStringToFixedSizeFromNumber(charValue);
            stringEncodedBuffer += binaryString;
        });
        stringEncodedBuffer = this.removeUnneededEndZeros(stringEncodedBuffer);
        var stringDecodedBuffer = "";
        var unaryCounter = 0;
        for (var index = 0; index < stringEncodedBuffer.length - 1; index += 1) {
            if (stringEncodedBuffer[index] === "0") {
                var quocient = unaryCounter;
                var k = Math.ceil(Math.log2(divider));
                var c = Math.pow(2, k) - divider;
                var remainderIndex = index + 1;
                var remainderBitString = stringEncodedBuffer.substring(remainderIndex, remainderIndex + k - 1);
                var remainder = parseInt(remainderBitString, 2);
                var decodedValue = void 0;
                if (remainder < c) {
                    decodedValue = quocient * divider + remainder;
                    index = remainderIndex + k - 1;
                }
                else {
                    remainderBitString = stringEncodedBuffer.substring(remainderIndex, remainderIndex + k);
                    remainder = parseInt(remainderBitString, 2);
                    decodedValue = quocient * divider + remainder - c;
                    index = remainderIndex + k;
                }
                unaryCounter = 0;
                stringDecodedBuffer += String.fromCharCode(decodedValue);
            }
            unaryCounter++;
        }
        return stringDecodedBuffer;
    };
    GolombEncoder.prototype.removeUnneededEndZeros = function (stringBinaryBuffer) {
        if (stringBinaryBuffer.endsWith("0")) {
            return stringBinaryBuffer = this.removeUnneededEndZeros(stringBinaryBuffer.slice(0, -1));
        }
        return stringBinaryBuffer;
    };
    return GolombEncoder;
}(Encoder_1.Encoder));
exports.GolombEncoder = GolombEncoder;
//# sourceMappingURL=GolombEncoder.js.map