'use strict';

const Command = require('../command');
class RangeAssign extends Command {

  run(base, quantity, value) {
    this.writeLog(`base: ${base}, quantity: ${quantity}, value: ${value}`);

    return true;
  }

  output(base, quantity, value) {
    base = this.parseVar(base);
    return [`Variable(1, ${base}, ${base + quantity - 1}, 0, 0, ${value}, 0)`];
  }

  get JP_NAME() {
    return '変数の操作(範囲初期化)';
  }
}

module.exports = RangeAssign;
