'use strict';

const Command = require('../command');
class RangeBoolean extends Command {

  run(base, quantity, value) {
    this.writeLog(`base: ${base}, quantity: ${quantity}, value: ${value ? 0 : 1}`);

    return true;
  }

  output(base, quantity, value) {
    base = this.parseVar(base);
    return [`Switch(1, ${base}, ${base + quantity - 1}, ${value ? 0 : 1})`];
  }

  get JP_NAME() {
    return 'スイッチの操作(範囲初期化)';
  }
}

module.exports = RangeBoolean;
