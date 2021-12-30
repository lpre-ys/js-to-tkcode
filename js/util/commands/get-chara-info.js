"use strict";

const Command = require("../command");

class getCharaInfo extends Command {
  run(receive, ev, type) {
    this.writeLog(`${receive}, ${ev}, ${type}`);

    return true;
  }

  output(receive, ev, type) {
    if (typeof receive == "string") {
      receive = this.parseVar(receive);
    }
    return [`Variable(0, ${receive}, ${receive}, 0, 6, ${ev}, ${type})`];
  }

  get JP_NAME() {
    return "◆変数の操作：代入, キャラの位置・表示情報";
  }
}

module.exports = getCharaInfo;
