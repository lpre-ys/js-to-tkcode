'use strict';

/**
 * QueueDequeue
 *
 * maxには変数番の最後が入っているので、-1とかしなくていい
 * [head][tail][max][tmp][0][][][][MAX - 1][MAX]
 */

const Command = require('../../command');
class QueueDequeue extends Command {

  run(base, retVar) {
    this.writeLog(`base: ${base}, retVar: ${retVar}`); //TODO

    return true;
  }

  output(base, retVar) {
    const ret = [];
    base = this.parseVar(base);
    retVar = this.parseVar(retVar);

    // isEmpty
    ret.push(`If(01, ${base}, 1, ${base + 1}, 0, 1)`);
    // error TODO
    // return dummy var (0)
    ret.push(`Variable(0, ${retVar}, ${retVar}, 0, 0, 0, 0)`);
    // debug Message
    // ret.push(`Text("isEmpty")`);

    ret.push(`Else`);

    // dequeue value
    ret.push(`Variable(0, ${retVar}, ${retVar}, 0, 2, ${base}, 0)`);

    // calc max index
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 0, 0, ${base + 4 - 1}, 0)`);
    ret.push(`Variable(0, ${base + 3}, ${base + 3}, 1, 1, ${base + 2}, 0)`);
    // set head index
    ret.push(`If(01, ${base}, 1, ${base + 3}, 1, 1)`); // equalでもいいが、念のため
    ret.push(`Variable(0, ${base}, ${base}, 0, 0, ${base + 4}, 0)`);  // reset head
    ret.push(`Else`);
    ret.push(`Variable(0, ${base}, ${base}, 1, 0, 1, 0)`);  // head++
    ret.push(`EndIf`);

    ret.push(`EndIf`);

    return ret;
  }

  get JP_NAME() {
    return 'SET:-init';
  }
}

module.exports = QueueDequeue;
