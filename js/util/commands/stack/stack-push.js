'use strict';

/**
 * StackPush
 *
 * [TOP][MAX][0][][][][MAX - 1]
 */

const Command = require('../../command');
class StackPush extends Command {

  run(base, value) {
    this.writeLog(`base: ${base}, value: ${value}`); //TODO

    return true;
  }

  output(base, value) {
    const ret = [];
    base = this.parseVar(base);

    // isFull
    ret.push(`If(01, ${base}, 1, ${base + 1}, 1, 1)`); // equalでもいいけど……

    // debug Message  // TODO エラー処理
    // ret.push(`Text("isFull")`);

    ret.push(`Else`);

    // push var
    if (typeof value == 'string') {
      // var
      value = this.parseVar(value);
      ret.push(`Variable(2, ${base}, 0, 0, 1, ${value}, 0)`);
    } else {
      // int扱い
      ret.push(`Variable(2, ${base}, 0, 0, 0, ${value}, 0)`);
    }
    // TOP++
    ret.push(`Variable(0, ${base}, ${base}, 1, 0, 1, 0)`);

    ret.push(`EndIf`);

    return ret;
  }

  get JP_NAME() {
    return 'SET:stack-PUSH';
  }
}

module.exports = StackPush;
