'use strict';

const Command = require('../command');
class LoadBgm extends Command {

  run() {
    this.writeLog(``);

    return true;
  }

  output() {
    return [`PlayStoredBGM`];
  }

  get JP_NAME() {
    return '記憶したBGMを演奏';
  }
}

module.exports = LoadBgm;
