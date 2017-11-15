'use strict';

/**
 * StackPush
 *
 * [TOP][MAX][0][][][][MAX - 1]
 */

const Command = require('../../command');
class StackPush extends Command {

  run(base, value, length = 1) {
    this.writeLog(`base: ${base}, value: ${value}, length: ${length}`); //TODO

    return true;
  }

  output(base, value, length = 1) {
    const ret = [];
    base = this.parseVar(base);

    // isFull
    if (length == 1) {
      ret.push(`If(01, ${base}, 1, ${base + 1}, 1, 1)`); // equalでもいいけど……
    } else {
      const tmpVar = this.getTmpVarNumber(0);
      ret.push(`Variable(0, ${tmpVar}, ${tmpVar}, 0, 1, ${base}, 0)`);
      ret.push(`Variable(0, ${tmpVar}, ${tmpVar}, 1, 0, ${length - 1}, 0)`);
      ret.push(`If(01, ${tmpVar}, 1, ${base + 1}, 1, 1)`);
    }


    // debug Message  // TODO エラー処理
    // ret.push(`Text("isFull")`);

    ret.push(`Else`);

    for (let i = 0; i < length; i ++) {
      // push var
      if (typeof value == 'string') {
        // var
        const valueVarNum = this.parseVar(value);
        ret.push(`Variable(2, ${base}, 0, 0, 1, ${valueVarNum + i}, 0)`);
      } else {
        // int扱い
        ret.push(`Variable(2, ${base}, 0, 0, 0, ${value}, 0)`);
      }
      // TOP++
      ret.push(`Variable(0, ${base}, ${base}, 1, 0, 1, 0)`);
    }

    ret.push(`EndIf`);

    return ret;
  }

  get JP_NAME() {
    return 'SET:stack-PUSH';
  }
}

module.exports = StackPush;
