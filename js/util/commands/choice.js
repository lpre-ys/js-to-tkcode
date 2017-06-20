'use strict';

const Command = require('../command');
const tkVarManager = require('../../lib/tk-var-manager');

class Choice extends Command {

  run(receive, label, choices, cancel = 5) {
    this.writeLog(`receive: ${receive}, label: ${label}, choices: ${JSON.stringify(choices)}, cancel: ${cancel}`);

    return true;
  }
  output(receive, label, choices, cancel = 5) {
    const outputs = [];

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
      outputs.push(`Branch("${choice}", ${i})`);
      outputs.push(`Variable(0, ${receive}, ${receive}, 0, 0, ${i + 1}, 0)`);
    });
    outputs.push(`Branch(4)`);  // cancelはとりあえず書いておく
    outputs.push(`Variable(0, ${receive}, ${receive}, 0, 0, -1, 0)`);
    outputs.push(`EndChoice`);

    return outputs;
  }
  get JP_NAME() {
    return '選択肢の表示';
  }
}

module.exports = Choice;
