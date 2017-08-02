'use strict';

/**
 * QueueIsEmpty
 *
 * maxには変数番の最後が入っているので、-1とかしなくていい
 * [head][tail][max][tmp][0][][][][MAX - 1][MAX]
 */

const Command = require('../../command');
class QueueIsEmpty extends Command {

  run(base, retBoolean) {
    this.writeLog(`base: ${base}, retBoolean: ${retBoolean}`); //TODO

    return true;
  }

  output(base, retBoolean) {
    const ret = [];
    base = this.parseVar(base);
    retBoolean = this.parseVar(retBoolean);

    ret.push(`If(01, ${base}, 1, ${base + 1}, 0, 1)`);
    ret.push(`Switch(0, ${retBoolean}, ${retBoolean}, 0)`);
    ret.push(`Else`);
    ret.push(`Switch(0, ${retBoolean}, ${retBoolean}, 1)`);
    ret.push(`EndIf`);

    return ret;
  }

  get JP_NAME() {
    return 'SET:Queue-isEmpty';
  }
}

module.exports = QueueIsEmpty;
