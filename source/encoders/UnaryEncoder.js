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
var BitString = require('bitstring');
var UnaryEncoder = /** @class */ (function (_super) {
    __extends(UnaryEncoder, _super);
    function UnaryEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnaryEncoder.prototype.executeEncoding = function (data) {
        var stringBuffer = "";
        Array.from(data).forEach(function (char) {
            var binaryStringResult = "0".repeat(char).concat("1");
            stringBuffer += binaryStringResult;
        });
        var encodingBuffer = "";
        for (var index = 0; index < stringBuffer.length - 1; index += 8) {
            var byteEncoded = parseInt(stringBuffer.substring(index, index + 8), 2);
            encodingBuffer += String.fromCharCode(byteEncoded);
        }
        return encodingBuffer;
    };
    UnaryEncoder.prototype.executeDecoding = function (data) {
        var _this = this;
        var stringEncodedBuffer = "";
        data.forEach(function (encodedChar) {
            var binaryString = _this.byteString(encodedChar);
            stringEncodedBuffer += binaryString;
        });
        var unaryArray = stringEncodedBuffer.split("1");
        var stringDecodedBuffer = "";
        unaryArray.forEach(function (unaryWord) {
            stringDecodedBuffer = stringDecodedBuffer.concat(String.fromCharCode(unaryWord.length));
        });
        console.log(stringDecodedBuffer.toString());
        return stringDecodedBuffer.toString();
    };
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
    return UnaryEncoder;
}(Encoder_1.Encoder));
exports.UnaryEncoder = UnaryEncoder;
//# sourceMappingURL=UnaryEncoder.js.map