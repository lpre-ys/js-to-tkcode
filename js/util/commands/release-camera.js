"use strict";

const Command = require("../command");
class ReleaseCamera extends Command {
  run() {
    this.writeLog(``);

    return true;
  }

  output() {
    return [`Screenscroll(1, 0, 0, 0, 0)`];
  }

  get JP_NAME() {
    return "画面のスクロール(固定解除)";
  }
}

module.exports = ReleaseCamera;
