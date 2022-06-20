"use strict";

const Command = require("../command");
class LockCamera extends Command {
  run() {
    this.writeLog(``);

    return true;
  }

  output() {
    return [`Screenscroll(0, 0, 0, 0, 0)`];
  }

  get JP_NAME() {
    return "画面のスクロール(固定)";
  }
}

module.exports = LockCamera;
