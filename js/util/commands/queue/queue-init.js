'use strict';

/**
 * QueueInit
 *
 * 通常の配列ではなく、変数番号での管理となる。
 * head, tailには変数番号が入る(インデックスではない)
 * stackと違い、maxは変数領域の最大数(max + 1)が入る
 * [head][tail][max][tmp][0][][][][MAX - 1][MAX](判定用に1個余分に確保する)
 */

const Command = require('../../command');
class QueueInit extends Command {

  run(base, max) {
    this.writeLog(`base: ${base}, max: ${max}`); //TODO

    return true;
  }

  output(base, max) {
    const ret = [];
    base = this.parseVar(base);

    ret.push(`Variable(1, ${base}, ${base + max + 4}, 0, 0, 0, 0)`); // ALL reset
    ret.push(`Variable(0, ${base}, ${base}, 0, 0, ${base + 4}, 0)`);  // head
    ret.push(`Variable(0, ${base + 1}, ${base + 1}, 0, 0, ${base + 4}, 0)`);  // tail
    ret.push(`Variable(0, ${base + 2}, ${base + 2}, 0, 0, ${max + 1}, 0)`);  // max

    return ret;
  }

  get JP_NAME() {
    return 'SET:-init';
  }
}

module.exports = QueueInit;
