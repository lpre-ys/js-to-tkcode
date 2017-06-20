'use strict';

const Command = require('../command');
class PlaySound extends Command {

  run(file, volume = 100, tempo = 100, balance = 50) {
    this.writeLog(`file: ${file}, volume: ${volume}, tempo: ${tempo}, balance: ${balance}`);

    return true;
  }

  output(file, volume = 100, tempo = 100, balance = 50) {
    return [`PlaySE("${file}", ${volume}, ${tempo}, ${balance})`];
  }

  get JP_NAME() {
    return '効果音の演奏';
  }
}

module.exports = PlaySound;
