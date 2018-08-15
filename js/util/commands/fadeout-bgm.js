'use strict';

const Command = require('../command');
class FadeoutBgm extends Command {

  run(time = 10) {
    this.writeLog(`${time}`);

    return true;
  }

  output(time = 10) {
    // 0.1秒単位からミリ秒に直す
    return [`FadeoutBGM(${time * 100})`];
  }

  get JP_NAME() {
    return '◆BGMのフェードアウト';
  }
}

module.exports = FadeoutBgm;
