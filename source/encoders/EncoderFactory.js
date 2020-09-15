"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EncodingType_1 = require("./EncodingType");
var FibonnaciEncoder_1 = require("./FibonnaciEncoder");
var UnaryEncoder_1 = require("./UnaryEncoder");
var EncoderFactory = /** @class */ (function () {
    function EncoderFactory() {
    }
    EncoderFactory.prototype.make = function (type) {
        switch (type) {
            case EncodingType_1.EncodingTypeIndex.Fibonacci:
                return new FibonnaciEncoder_1.FibonnaciEncoder();
            case EncodingType_1.EncodingTypeIndex.Unary:
                return new UnaryEncoder_1.UnaryEncoder();
            default:
                return null;
        }
    };
    return EncoderFactory;
}());
exports.EncoderFactory = EncoderFactory;
//# sourceMappingURL=EncoderFactory.js.map