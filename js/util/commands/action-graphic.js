'use strict';

const Command = require('../command');
class ActionGraphic extends Command {

  run(file, num) {
    this.writeLog(`${file}, ${num}`);

    return true;
  }

  output(file, num) {
    return [`SubAct(34, "${file}", ${num})`];
  }

  get JP_NAME() {
    return 'アクション(グラフィック変更)';
  }
}

module.exports = ActionGraphic;
