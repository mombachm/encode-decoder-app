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
var FibonnaciEncoder_1 = require("../encoders/FibonnaciEncoder");
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
        var encoder = this.loadEncoder();
        encoder.decode(this.filePath);
        term.green("File decoded with success.\n");
        term.processExit(0);
    };
    DecodeCommand.prototype.verifyFilePath = function () {
        if (!this.filePath) {
            console.log("aqui");
            term.red("The specified file path is invalid for decoding.\n");
            term.yellow("Usage: yarn decode [FILE PATH]");
            process.exit(1);
        }
    };
    DecodeCommand.prototype.loadEncoder = function () {
        return new FibonnaciEncoder_1.FibonnaciEncoder();
    };
    return DecodeCommand;
}(Command_1.AbstractCommand));
exports.DecodeCommand = DecodeCommand;
new DecodeCommand(process.argv).execute();
//# sourceMappingURL=DecodeCommand.js.map