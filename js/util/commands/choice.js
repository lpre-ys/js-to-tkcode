'use strict';

const Command = require('../command');
const tkVarManager = require('../../lib/tk-var-manager');

class Choice extends Command {

  run(receive, label, choices, cancel = 5, isFlash = true) {
    this.writeLog(`receive: ${receive}, label: ${label}, choices: ${JSON.stringify(choices)}, cancel: ${cancel}, isFlash: ${isFlash}`);

    return true;
  }
  output(receive, label, choices, cancel = 5,  isFlash = true) {
    const outputs = [];

    const preFlash = isFlash ? '\\>' : '';

    if (typeof receive == 'string') {
      const number = tkVarManager.getVarNumber(receive);
      receive = number;
    }

    if (!Array.isArray(choices)) {
      return outputs;  // TODO エラー処理？
    }

    const count = choices.length;
    if (count > 4) {
      return outputs; // TODO エラー処理
    }

    outputs.push(`Choice("${label}", ${cancel})`);
    choices.forEach((choice, i) => {
      outputs.push(`Branch("${preFlash}${choice}", ${i})`);
      outputs.push(`Variable(0, ${receive}, ${receive}, 0, 0, ${i + 1}, 0)`);
    });
    if (cancel == 5) {
      // キャンセル分岐有りの場合
      outputs.push(`Branch(4)`);
      outputs.push(`Variable(0, ${receive}, ${receive}, 0, 0, -1, 0)`);
    }
    outputs.push(`EndChoice`);

    return outputs;
  }
  get JP_NAME() {
    return '選択肢の表示';
  }
}

module.exports = Choice;
