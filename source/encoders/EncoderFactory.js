"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeltaEncoder_1 = require("./DeltaEncoder");
var EliasGammaEncoder_1 = require("./EliasGammaEncoder");
var EncodingType_1 = require("./EncodingType");
var FibonnaciEncoder_1 = require("./FibonnaciEncoder");
var GolombEncoder_1 = require("./GolombEncoder");
var UnaryEncoder_1 = require("./UnaryEncoder");
var EncoderFactory = /** @class */ (function () {
    function EncoderFactory() {
    }
    EncoderFactory.prototype.make = function (headerConfigs, inputData) {
        switch (headerConfigs.encodingType) {
            case EncodingType_1.EncodingType.Fibonacci:
                return new FibonnaciEncoder_1.FibonnaciEncoder(inputData);
            case EncodingType_1.EncodingType.Unary:
                return new UnaryEncoder_1.UnaryEncoder(inputData);
            case EncodingType_1.EncodingType.Golomb:
                return new GolombEncoder_1.GolombEncoder(inputData, headerConfigs.divider);
            case EncodingType_1.EncodingType.Delta:
                return new DeltaEncoder_1.DeltaEncoder(inputData);
            case EncodingType_1.EncodingType.EliasGamma:
                return new EliasGammaEncoder_1.EliasGammaEncoder(inputData);
            default:
                return null;
        }
    };
    return EncoderFactory;
}());
exports.EncoderFactory = EncoderFactory;
//# sourceMappingURL=EncoderFactory.js.map