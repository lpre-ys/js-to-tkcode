'use strict';
class Command {
  constructor() {
    this.mode = 'exec';
    this.executeLog = require('./execute-log');
  }
  getMethod() {
    if (this.mode == 'exec') {
      return this.exec;
    } else if (this.mode == 'output') {
      return this.output;
    }
  }
  get JP_NAME() {
    return 'TODO';
  }
  exec() {

  }
  output() {

  }
  writeLog(message) {
    this.executeLog.push(`◆${this.JP_NAME}：${message}`);
  }
}
module.exports = Command;
