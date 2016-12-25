'use strict';

class Command {
  constructor() {
    this.mode = 'exec';
    this.executeLog = require('./execute-log');
  }
  execute(...args) {
    if (this.mode == 'exec') {
      return this.run.apply(this, args);
    } else if (this.mode == 'output') {
      return this.output.apply(this, args);
    }
  }
  get JP_NAME() {
    return 'TODO';
  }
  run() {

  }
  output() {

  }
  writeLog(message) {
    this.executeLog.push(`◆${this.JP_NAME}：${message}`);
  }
}
module.exports = Command;
