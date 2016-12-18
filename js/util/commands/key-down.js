'use strict';

const Command = require('../command');

const keys = ['enter', 'cancel', 'shift', 'down', 'left', 'right', 'up'];
class KeyDown extends Command {

  exec(receive, push = true, targetKeys = false) {
    this.writeLog(`var[${receive}], push[${push}], target[${targetKeys ? targetKeys.join(',') : "ALL"}]`);

    return true;
  }
  output(receive, push = true, targetKeys = false) {
    const keyCodes = [];
    keys.forEach((key) => {
      keyCodes.push((!targetKeys || targetKeys.include(key)) ? 1 : 0);
    });

    return `KeyEntry(${receive}, ${push ? 1 : 0}, 1, ${keyCodes.join(',')})`;
  }
  get JP_NAME() {
    return 'キー入力の処理';
  }
}

module.exports = KeyDown;
