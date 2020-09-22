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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Command_1 = require("./Command");
var EncodingType_1 = require("../encoders/EncodingType");
var EncoderFactory_1 = require("../encoders/EncoderFactory");
var FileIO_1 = require("../io/FileIO");
var term = require('terminal-kit').terminal;
var EncodeCommand = /** @class */ (function (_super) {
    __extends(EncodeCommand, _super);
    function EncodeCommand(commandArguments) {
        var _this = _super.call(this, commandArguments) || this;
        _this.filePath = _this.arguments[0];
        _this.verifyFilePath();
        return _this;
    }
    EncodeCommand.prototype.execute = function () {
        _super.prototype.execute.call(this);
        this.showCommandTitle();
        this.showEncodingOptionsTable();
        this.showEncodingTypeSelection();
    };
    EncodeCommand.prototype.verifyFilePath = function () {
        if (!this.filePath) {
            term.red("The specified file path is invalid for encoding.\n");
            term.yellow("Usage: yarn encode [FILE PATH]");
            process.exit(1);
        }
    };
    EncodeCommand.prototype.showCommandTitle = function () {
        term.brightCyan("############## Encoder ##############\n");
    };
    EncodeCommand.prototype.showEncodingOptionsTable = function () {
        term.brightCyan("\nThese are the available encoding options:\n");
        term.table([
            ['Options', 'Encoding Types'],
            ['Golomb', EncodingType_1.EncodingTypeIndex.Golomb],
            ['Elias-Gamma', EncodingType_1.EncodingTypeIndex.EliasGamma],
            ['Fibonacci', EncodingType_1.EncodingTypeIndex.Fibonacci],
            ['Unary', EncodingType_1.EncodingTypeIndex.Unary],
            ['Delta', EncodingType_1.EncodingTypeIndex.Delta]
        ], {
            hasBorder: true,
            contentHasMarkup: true,
            textAttr: { bgColor: 'default' },
            width: 60,
            fit: true // Activate all expand/shrink + wordWrap
        });
    };
    EncodeCommand.prototype.showEncodingTypeSelection = function () {
        var _this = this;
        term.brightMagenta("Select a encoding type to start the encoding process:\n");
        term.inputField(function (error, input) { return __awaiter(_this, void 0, void 0, function () {
            var divider, encoder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        term.brightYellow("\nSelected encoding type: '%s'\n", EncodingType_1.EncodingTypeNamesMapping[input]);
                        this.encodingType = EncodingType_1.EncodingTypeNamesMapping[input];
                        if (!(this.encodingType === EncodingType_1.EncodingType.Golomb)) return [3 /*break*/, 2];
                        term.brightMagenta("\nSelected the divider for Golomb encoding type: '%s'\n", EncodingType_1.EncodingTypeNamesMapping[input]);
                        return [4 /*yield*/, this.showEncodingDividerSelectionIfNeeded()];
                    case 1:
                        divider = _a.sent();
                        if (divider) {
                            this.divider = parseInt(divider);
                        }
                        if (!divider || this.divider <= 0) {
                            term.red("\nInvalid divider.");
                            term.processExit(1);
                            process.exit(1);
                        }
                        term.brightYellow("\nSelected divider: '%s'\n", this.divider);
                        _a.label = 2;
                    case 2:
                        encoder = this.loadEncoder();
                        if (!encoder) {
                            term.red("\nInvalid encoding type.");
                            term.processExit(1);
                            process.exit(1);
                        }
                        term.brightCyan("\nEncoding started... '%s'\n", EncodingType_1.EncodingTypeNamesMapping[input]);
                        encoder.encode(this.filePath);
                        term.processExit(0);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    EncodeCommand.prototype.showEncodingDividerSelectionIfNeeded = function () {
        return term.inputField({
            cancelable: true
        }).promise;
    };
    EncodeCommand.prototype.loadEncoder = function () {
        var fileData = new FileIO_1.FileIO().readFileDataForEncoding(this.filePath);
        var headerConfigs = {
            encodingType: this.encodingType,
            divider: this.divider
        };
        return new EncoderFactory_1.EncoderFactory().make(headerConfigs, fileData);
    };
    return EncodeCommand;
}(Command_1.AbstractCommand));
exports.EncodeCommand = EncodeCommand;
try {
    new EncodeCommand(process.argv).execute();
}
catch (error) {
    term.red("Error during encoding.\n");
    term.processExit(1);
    process.exit(1);
}
//# sourceMappingURL=EncodeCommand.js.map