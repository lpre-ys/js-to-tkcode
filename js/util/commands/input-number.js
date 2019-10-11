'use strict';

const Command = require('../command');
const tkVarManager = require('../../lib/tk-var-manager');

class InputNumber extends Command {

  run(receive, digit) {
    this.writeLog(`receive: ${receive}, digit: ${digit}`);

    return true;
  }

  output(receive, digit) {
    if (typeof receive == 'string') {
      const number = tkVarManager.getVarNumber(receive);
      receive = number;
    }
    return [`ValueEntry(${digit}, ${receive})`];
  }

  get JP_NAME() {
    return '数値入力の処理';
  }
}

module.exports = InputNumber;
