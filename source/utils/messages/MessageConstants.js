"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = {
    Error: {
        Interpreter: {
            InvalidCommand: "Invalid Command"
        },
        IOStream: {
            WriteError: "An error has occurred during saving data.",
            ReadError: "An error has occurred during reading data.",
        },
        Data: {
            NotLoaded: "Data not loaded."
        },
        Task: {
            FailedToCreate: "Failed to create task."
        },
        Event: {
            FailedToCreate: "Failed to create event."
        }
    },
    Info: {
        ListTaskCommand: {
            NoTasks: "There are no tasks to list."
        },
        ListHistoryCommand: {
            NoEvents: "There are no events to list."
        }
    },
    Commands: {
        DeleteLogItemCommand: {
            Error: {
                InvalidIds: "Invalid id(s) informed."
            }
        }
    },
    LogItemService: {
        Error: {
            InvalidIds: "Invalid id(s) to retrive task(s)."
        }
    }
};
exports.default = Message;
//# sourceMappingURL=MessageConstants.js.map