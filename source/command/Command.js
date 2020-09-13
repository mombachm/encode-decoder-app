"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCommand = /** @class */ (function () {
    function AbstractCommand(commandArguments) {
        commandArguments.splice(0, 2);
        this.arguments = commandArguments;
    }
    AbstractCommand.prototype.setArguments = function (commandArguments) {
        this.arguments = commandArguments;
    };
    AbstractCommand.prototype.hasArguments = function () {
        return Boolean(this.arguments.length);
    };
    AbstractCommand.prototype.setNextCommand = function (command) {
        this.nextCommand = command;
    };
    AbstractCommand.prototype.hasNextCommand = function () {
        return Boolean(this.nextCommand);
    };
    AbstractCommand.prototype.execute = function () {
        if (this.hasNextCommand()) {
            this.nextCommand.execute();
        }
    };
    return AbstractCommand;
}());
exports.AbstractCommand = AbstractCommand;
//# sourceMappingURL=Command.js.map