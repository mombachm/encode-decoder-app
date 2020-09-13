"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
var EncodingType;
(function (EncodingType) {
    EncodingType["Fibonacci"] = "Fibonacci";
    EncodingType["Golomb"] = "Golomb";
    EncodingType["EliasGamma"] = "Elias-Gamma";
    EncodingType["Unary"] = "Unary";
    EncodingType["Delta"] = "Delta";
})(EncodingType = exports.EncodingType || (exports.EncodingType = {}));
exports.EncodingTypeIndex = (_a = {},
    _a[EncodingType.Fibonacci] = "1",
    _a[EncodingType.Golomb] = "2",
    _a[EncodingType.EliasGamma] = "3",
    _a[EncodingType.Unary] = "4",
    _a[EncodingType.Delta] = "5",
    _a);
exports.EncodingTypeNamesMapping = (_b = {},
    _b[exports.EncodingTypeIndex[EncodingType.Fibonacci]] = EncodingType.Fibonacci,
    _b[exports.EncodingTypeIndex[EncodingType.Golomb]] = EncodingType.Golomb,
    _b[exports.EncodingTypeIndex[EncodingType.EliasGamma]] = EncodingType.EliasGamma,
    _b[exports.EncodingTypeIndex[EncodingType.Unary]] = EncodingType.Unary,
    _b[exports.EncodingTypeIndex[EncodingType.Delta]] = EncodingType.Delta,
    _b);
//# sourceMappingURL=EncodingType.js.map