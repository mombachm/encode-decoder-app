import Constants from "../utils/Constants";
import Message from "../utils/messages/MessageConstants";

export class JSONFileIOStream {
  private fs = require('fs');
  private path = require('path');

  private static instance: JSONFileIOStream;

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return new JSONFileIOStream();
  }

  public saveJSON(model: any) {
    this.createDirIfNeeded(Constants.Data.Path);
    this.createDirIfNeeded(Constants.Data.Backup.Path);
    const JSONModel = JSON.stringify(model);
    try {
      this.fs.writeFileSync(Constants.Data.Path + Constants.Data.Filename, JSONModel);
      this.fs.writeFileSync(this.getBackupFilename(), JSONModel);
    } catch(e) {
    }
  }

  public readJSON(): any {
    try {
      const data = this.fs.readFileSync(Constants.Data.Path + Constants.Data.Filename);
      return JSON.parse(data);
    } catch(e) {
    }
  }

  private createDirIfNeeded(dirPath: string) {
    if (!this.fs.existsSync(dirPath)){
        this.fs.mkdirSync(dirPath);
    }
  }

  private getBackupFilename(): string {
    return Constants.Data.Backup.Path + "/" + this.path.parse(Constants.Data.Filename).name + "_" + this.getDateForFilename() + ".json";
  }

  private getDateForFilename(): string {
    return new Date().toLocaleDateString().replace(/[/]/g,"_");
  }
}