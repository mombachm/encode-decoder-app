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
var EncoderFactory_1 = require("../encoders/EncoderFactory");
var FileIO_1 = require("../io/FileIO");
var term = require('terminal-kit').terminal;
var DecodeCommand = /** @class */ (function (_super) {
    __extends(DecodeCommand, _super);
    function DecodeCommand(commandArguments) {
        var _this = _super.call(this, commandArguments) || this;
        _this.filePath = _this.arguments[0];
        _this.verifyFilePath();
        return _this;
    }
    DecodeCommand.prototype.execute = function () {
        _super.prototype.execute.call(this);
        this.showCommandTitle();
        var encoder = this.loadEncoder();
        if (!encoder) {
            term.red("Invalid encoding type.");
            term.processExit(1);
            process.exit(1);
        }
        encoder.decode(this.filePath);
        term.processExit(0);
    };
    DecodeCommand.prototype.verifyFilePath = function () {
        if (!this.filePath) {
            term.red("The specified file path is invalid for decoding.\n");
            term.yellow("Usage: yarn decode [FILE PATH]");
            term.processExit(1);
            process.exit(1);
        }
    };
    DecodeCommand.prototype.showCommandTitle = function () {
        term.brightCyan("############## Decoder ##############\n");
    };
    DecodeCommand.prototype.loadEncoder = function () {
        var fileIO = new FileIO_1.FileIO();
        var fileData = fileIO.readFileDataForDecoding(this.filePath);
        var headerConfigs = fileIO.getHeaderConfigs();
        if (!headerConfigs.encodingType) {
            term.red("Invalid header configuration.");
            term.processExit(1);
            process.exit(1);
        }
        this.encodingType = headerConfigs.encodingType;
        term.brightMagenta("\nFile encoding type: '%s'\n", this.encodingType);
        term.brightCyan("\nDecoding started...\n");
        return new EncoderFactory_1.EncoderFactory().make(headerConfigs, fileData);
    };
    return DecodeCommand;
}(Command_1.AbstractCommand));
exports.DecodeCommand = DecodeCommand;
try {
    new DecodeCommand(process.argv).execute();
}
catch (error) {
    term.red("Error during decoding.\n");
    term.processExit(1);
    process.exit(1);
}
//# sourceMappingURL=DecodeCommand.js.map