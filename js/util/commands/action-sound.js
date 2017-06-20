'use strict';

const Command = require('../command');
class ActionSound extends Command {

  run(file, volume = 100, tempo = 100, balance = 50, times = 1) {
    this.writeLog(`file: ${file}, volume: ${volume}, tempo: ${tempo}, balance: ${balance}, times: ${times}`);

    return true;
  }

  output(file, volume = 100, tempo = 100, balance = 50, times = 1) {
    return Array(times).fill(`SubAct(35, "${file}", ${volume}, ${tempo}, ${balance})`);
  }

  get JP_NAME() {
    return 'アクション(効果音)';
  }
}

module.exports = ActionSound;
