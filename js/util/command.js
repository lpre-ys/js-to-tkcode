'use strict';

const tkVarManager = require('../lib/tk-var-manager');

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

  parseVar(variable) {
    if (typeof variable == 'string') {
      // 配列のパース TODO test書きたい
      const matchResult = variable.match(/(.*)\[(\d+)\]/);
      if (matchResult) {
        variable = tkVarManager.getVarNumber(matchResult[1]) + parseInt(matchResult[2], 10);
      } else {
        variable = tkVarManager.getVarNumber(variable);
      }
    }

    return variable;
  }
}
module.exports = Command;
