'use strict';

/**
 * QueueEnqueue
 *
 * maxは変数領域の最大数(引数 + 1)
 * [head][tail][max][tmp][0][][][][MAX - 1][MAX]
 */

const Command = require('../../command');
class QueueEnqueue extends Command {

  run(base, value) {
    this.writeLog(`base: ${base}, value: ${value}`); //TODO

    return true;
  }

  output(base, value) {
    const ret = [];
    base = this.parseVar(base);

    // isFull check
    // calc (tail + 1) % max
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 0, 1, ${base + 1}, 0)`);
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 2, 0, ${base + 4}, 0)`);  // 0start indexに変換
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 1, 0, 1, 0)`);
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 5, 1, ${base + 2}, 0)`);
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 1, 0, ${base + 4}, 0)`);  // var indexに戻す

    // // debug
    // ret.push(`Text("\\V[${base + 3}]")`);

    ret.push(`If(01, ${base}, 1, ${base + 3}, 0, 1)`);

    // debug Message  TODO エラー処理
    // ret.push(`Text("isFull")`);

    ret.push(`Else`);

    // enqueue value
    if (typeof value == 'string') {
      // var
      value = this.parseVar(value);
      ret.push(`Variable(2, ${base + 1}, 0, 0, 1, ${value}, 0)`);
    } else {
      // int扱い
      ret.push(`Variable(2, ${base + 1}, 0, 0, 0, ${value}, 0) `); // var[tail] = value;
    }

    // calc max index
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 0, 0, ${base + 4 - 1}, 0)`);
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 1, 1, ${base + 2}, 0)`);
    // inc tail index
    ret.push(`If(01, ${base + 1}, 1, ${base + 3}, 1, 1)`);
    ret.push(`Variable(0, ${base + 1}, ${base + 1}, 0, 0, ${base + 4}, 0)`);  // reset tail
    ret.push(`Else`);
    ret.push(`Variable(0, ${base + 1}, ${base + 1}, 1, 0, 1, 0)`);  // tail++
    ret.push(`EndIf`);

    ret.push(`Endif`);

    return ret;
  }

  get JP_NAME() {
    return 'SET:-init';
  }
}

module.exports = QueueEnqueue;
