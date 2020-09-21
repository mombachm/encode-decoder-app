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
var DeltaEncoder = /** @class */ (function (_super) {
    __extends(DeltaEncoder, _super);
    function DeltaEncoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeltaEncoder.prototype.encode = function (filepath) {
        var dataEncoded = this.executeEncoding(this.inputData);
        var headerConfigs = {
            encodingType: EncodingType_1.EncodingType.Delta,
            divider: 0
        };
        this.saveEncodedFileData(dataEncoded, filepath, headerConfigs);
    };
    DeltaEncoder.prototype.decode = function (filepath) {
        var dataDecoded = this.executeDecoding(this.inputData);
        this.saveDecodedFileData(dataDecoded, filepath);
    };
    DeltaEncoder.prototype.executeEncoding = function (data) {
        var encodingBuffer = "";
        var last = 0;
        for (var index = 0; index < data.length; index += 1) {
            var current = data[index].charCodeAt(0);
            var byteEncoded = current - last;
            last = current;
            encodingBuffer += String.fromCharCode(byteEncoded);
        }
        return encodingBuffer;
    };
    DeltaEncoder.prototype.executeDecoding = function (data) {
        var stringDecodedBuffer = "";
        var last = 0;
        for (var index = 0; index < data.length; index += 1) {
            var delta = data[index].charCodeAt(0);
            var byteDecoded = delta + last;
            last = byteDecoded;
            stringDecodedBuffer += String.fromCharCode(byteDecoded);
        }
        return stringDecodedBuffer;
    };
    return DeltaEncoder;
}(Encoder_1.Encoder));
exports.DeltaEncoder = DeltaEncoder;
//# sourceMappingURL=DeltaEncoder.js.map