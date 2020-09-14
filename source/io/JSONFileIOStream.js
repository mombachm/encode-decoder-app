"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../utils/Constants");
var JSONFileIOStream = /** @class */ (function () {
    function JSONFileIOStream() {
        this.fs = require('fs');
        this.path = require('path');
    }
    JSONFileIOStream.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        return new JSONFileIOStream();
    };
    JSONFileIOStream.prototype.saveJSON = function (model) {
        this.createDirIfNeeded(Constants_1.default.Data.Path);
        this.createDirIfNeeded(Constants_1.default.Data.Backup.Path);
        var JSONModel = JSON.stringify(model);
        try {
            this.fs.writeFileSync(Constants_1.default.Data.Path + Constants_1.default.Data.Filename, JSONModel);
            this.fs.writeFileSync(this.getBackupFilename(), JSONModel);
        }
        catch (e) {
        }
    };
    JSONFileIOStream.prototype.readJSON = function () {
        try {
            var data = this.fs.readFileSync(Constants_1.default.Data.Path + Constants_1.default.Data.Filename);
            return JSON.parse(data);
        }
        catch (e) {
        }
    };
    JSONFileIOStream.prototype.createDirIfNeeded = function (dirPath) {
        if (!this.fs.existsSync(dirPath)) {
            this.fs.mkdirSync(dirPath);
        }
    };
    JSONFileIOStream.prototype.getBackupFilename = function () {
        return Constants_1.default.Data.Backup.Path + "/" + this.path.parse(Constants_1.default.Data.Filename).name + "_" + this.getDateForFilename() + ".json";
    };
    JSONFileIOStream.prototype.getDateForFilename = function () {
        return new Date().toLocaleDateString().replace(/[/]/g, "_");
    };
    return JSONFileIOStream;
}());
exports.JSONFileIOStream = JSONFileIOStream;
//# sourceMappingURL=JSONFileIOStream.js.map