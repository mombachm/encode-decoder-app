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
    EncodeCommand.prototype.showEncodingOptionsTable = function () {
        term.green("These are the available encoding options:\n");
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
        term.yellow("Select a encoding type to start the encoding process:\n");
        term.inputField(function (error, input) {
            term.green("\nSelected encoding type: '%s'\n", EncodingType_1.EncodingTypeNamesMapping[input]);
            _this.encodingType = EncodingType_1.EncodingTypeNamesMapping[input];
            var encoder = _this.loadEncoder();
            if (!encoder) {
                term.red("Invalid encoding type.");
                term.processExit(1);
                process.exit(1);
            }
            term.green("\nEncoding started... '%s'\n", EncodingType_1.EncodingTypeNamesMapping[input]);
            encoder.encode(_this.filePath);
            term.processExit(0);
        });
    };
    EncodeCommand.prototype.loadEncoder = function () {
        var fileData = new FileIO_1.FileIO().readFileDataForEncoding(this.filePath);
        return new EncoderFactory_1.EncoderFactory().make(this.encodingType, fileData);
    };
    return EncodeCommand;
}(Command_1.AbstractCommand));
exports.EncodeCommand = EncodeCommand;
new EncodeCommand(process.argv).execute();
//# sourceMappingURL=EncodeCommand.js.map