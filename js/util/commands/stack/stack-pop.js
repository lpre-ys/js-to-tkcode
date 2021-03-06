'use strict';

/**
 * StackPop
 *
 * 代入先はretVarとして指定する
 * [TOP][MAX][0][][][][MAX - 1]
 */

const Command = require('../../command');
class StackPop extends Command {

  run(base, retVar, length = 1) {
    this.writeLog(`base: ${base}, retVar: ${retVar}, length: ${length}`); //TODO

    return true;
  }

  output(base, retVar, length = 1) {
    const ret = [];
    base = this.parseVar(base);
    retVar = this.parseVar(retVar);

    // isEmpty
    ret.push(`If(01, ${base}, 0, ${base + 2 + length - 1}, 2, 1)`); // equalでもいいけど……

    // return dummy var (0)
    ret.push(`Variable(0, ${retVar}, ${retVar}, 0, 0, 0, 0)`);
    // debug Message TODO
    // ret.push(`Text("isEmpty")`);

    ret.push(`Else`);

    for (let i = 0; i < length; i++) {
      // TOP--
      ret.push(`Variable(0, ${base}, ${base}, 2, 0, 1, 0)`);
      // pop var
      ret.push(`Variable(0, ${retVar + length - i - 1}, ${retVar + length - i - 1}, 0, 2, ${base}, 0)`);
    }

    ret.push(`EndIf`);

    return ret;
  }

  get JP_NAME() {
    return 'SET:stack-PUSH';
  }
}

module.exports = StackPop;
