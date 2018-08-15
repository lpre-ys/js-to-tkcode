'use strict';

const Command = require('../command');
  class PlayBgm extends Command {

  run(file, time = 0, volume = 100, tempo = 100, balance = 50) {
    this.writeLog(`file: ${file}, time: ${time}, volume: ${volume}, tempo: ${tempo}, balance: ${balance}`);

    return true;
  }

  output(file, time = 0, volume = 100, tempo = 100, balance = 50) {
    return [`PlayBGM("${file}", ${time}, ${volume}, ${tempo}, ${balance})`];
  }

  get JP_NAME() {
    return '効果音の演奏';
  }
}

module.exports = PlayBgm;
