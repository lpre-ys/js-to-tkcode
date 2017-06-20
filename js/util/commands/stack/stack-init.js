'use strict';

/**
 * StackInit
 *
 * TOPのリセット、MAXの設定、valuesのリセット
 * 通常のStackと違い、TOPは0から始まらない
 * MAXは個数ではなく変数番のLastが入る
 * [TOP][MAX][0][][][][MAX - 1]
 */

const Command = require('../../command');
class StackInit extends Command {

  run(base, max) {
    this.writeLog(`base: ${base}, max: ${max}`); //TODO

    return true;
  }

  output(base, max) {
    const ret = [];
    base = this.parseVar(base);

    ret.push(`Variable(0, ${base}, ${base}, 0, 0, ${base + 2}, 0)`);  // TOP
    ret.push(`Variable(0, ${base + 1}, ${base + 1}, 0, 0, ${base + 2 + max}, 0)`);
    ret.push(`Variable(1, ${base + 2}, ${base + 2 + max - 1}, 0, 0, 0, 0)`);

    return ret;
  }

  get JP_NAME() {
    return 'SET:stack-init';
  }
}

module.exports = StackInit;
