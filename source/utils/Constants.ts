
var appRoot = require('app-root-path');

const Constants = {
  Data: {
    Path: appRoot.path + "/data",
    Filename: "/data.json",
    Backup: {
      Path: appRoot.path + "/data/backup"
    }
  },
};
export default Constants;
