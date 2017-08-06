'use strict';

/**
 * QueueRevert(1個巻き戻す)
 *
 * maxは変数領域の最大数(引数 + 1)
 * [head][tail][max][tmp][0][][][][MAX - 1][MAX]
 */

const Command = require('../../command');
class QueueRevert extends Command {

  run(base) {
    this.writeLog(`base: ${base}`);

    return true;
  }

  output(base) {
    const ret = [];
    base = this.parseVar(base);
    // TODO debug comment
    ret.push(`Note("Queue revert start")`);

    // isEmpty check
    ret.push(`If(01, ${base}, 1, ${base + 1}, 5, 0)`);

    // revert (tail - 1)
    // calc max index
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 0, 0, ${base + 4 - 1}, 0)`);
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 1, 1, ${base + 2}, 0)`);
    // check tail index
    ret.push(`If(01, ${base + 1}, 0, ${base + 4}, 0, 1)`);
    ret.push(`Variable(0, ${base + 1}, ${base + 1}, 0, 1, ${base + 3}, 0)`);  // tail to last
    ret.push(`Else`);
    ret.push(`Variable(0, ${base + 1}, ${base + 1}, 2, 0, 1, 0)`);  // tail--
    ret.push(`EndIf`);

    ret.push(`EndIf`);
    ret.push(`Note("Queue revert end")`);
    return ret;
  }

  get JP_NAME() {
    return 'Queue:revert';
  }
}

module.exports = QueueRevert;
