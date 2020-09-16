"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EncodingType_1 = require("./EncodingType");
var FibonnaciEncoder_1 = require("./FibonnaciEncoder");
var UnaryEncoder_1 = require("./UnaryEncoder");
var EncoderFactory = /** @class */ (function () {
    function EncoderFactory() {
    }
    EncoderFactory.prototype.make = function (type, inputData) {
        switch (type) {
            case EncodingType_1.EncodingType.Fibonacci:
                return new FibonnaciEncoder_1.FibonnaciEncoder(inputData);
            case EncodingType_1.EncodingType.Unary:
                return new UnaryEncoder_1.UnaryEncoder(inputData);
            default:
                return null;
        }
    };
    return EncoderFactory;
}());
exports.EncoderFactory = EncoderFactory;
//# sourceMappingURL=EncoderFactory.js.map