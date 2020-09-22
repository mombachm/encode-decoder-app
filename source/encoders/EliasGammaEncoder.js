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
var EliasGammaEncoder = /** @class */ (function (_super) {
    __extends(EliasGammaEncoder, _super);
    function EliasGammaEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EliasGammaEncoder.prototype.encode = function (filepath) {
        var headerConfigs = {
            encodingType: EncodingType_1.EncodingType.EliasGamma,
            divider: 0
        };
        var dataEncoded = this.executeEncoding(this.inputData);
        this.saveEncodedFileData(dataEncoded, filepath, headerConfigs);
    };
    EliasGammaEncoder.prototype.decode = function (filepath) {
        var dataDecoded = this.executeDecoding(this.inputData);
        this.saveDecodedFileData(dataDecoded, filepath);
    };
    EliasGammaEncoder.prototype.executeEncoding = function (data) {
        var _this = this;
        var stringBuffer = "";
        Array.from(data).forEach(function (char) {
            if (char) {
                var charValue = char.charCodeAt(0);
                var n = Math.floor(Math.log2(charValue));
                var remainder = charValue - Math.pow(2, n);
                var remainderBinary = void 0;
                remainderBinary = _this.byteStringToFixedSizeFromNumber(remainder, n);
                var nUnary = "0".repeat(n).concat("1");
                stringBuffer += nUnary.concat(remainderBinary);
            }
        });
        var encodingBuffer = "";
        for (var index = 0; index < stringBuffer.length; index += 8) {
            var byteString = stringBuffer.substring(index, index + 8);
            var byteStringFixedSize = this.byteStringToFixedSizeZeroRight(byteString);
            var byteEncoded = parseInt(byteStringFixedSize, 2);
            encodingBuffer += String.fromCharCode(byteEncoded);
        }
        return encodingBuffer;
    };
    EliasGammaEncoder.prototype.executeDecoding = function (data) {
        var _this = this;
        var stringEncodedBuffer = "";
        data.forEach(function (encodedChar) {
            var charValue = encodedChar.charCodeAt(0);
            var binaryString = _this.byteStringToFixedSizeFromNumber(charValue);
            stringEncodedBuffer += binaryString;
        });
        var stringDecodedBuffer = "";
        var unaryCounter = 0;
        for (var index = 0; index < stringEncodedBuffer.length; index += 1) {
            if (stringEncodedBuffer[index] === "1") {
                var n = unaryCounter;
                var remainderIndex = index + 1;
                var remainderBitString = stringEncodedBuffer.substring(remainderIndex, remainderIndex + n);
                var remainder = parseInt(remainderBitString, 2);
                var decodedValue = Math.pow(2, n) + remainder;
                index = remainderIndex + n;
                unaryCounter = 0;
                stringDecodedBuffer += String.fromCharCode(decodedValue);
            }
            unaryCounter++;
        }
        return stringDecodedBuffer;
    };
    return EliasGammaEncoder;
}(Encoder_1.Encoder));
exports.EliasGammaEncoder = EliasGammaEncoder;
//# sourceMappingURL=EliasGammaEncoder.js.map