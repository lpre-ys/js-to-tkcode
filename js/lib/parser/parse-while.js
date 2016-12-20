'use strict';

const parseTest = require('./parse-test');

function parseWhile(node, outputs, that) {
  outputs.push(`Loop`);
  if (parseTest(node.test, outputs)) {
    // test句が有効な場合のみ、break文を自動で挟む
    outputs.push(`Break`);
    outputs.push(`EndIf`);
  }
  that.parseAst(node.body);
  outputs.push(`EndLoop`);
}

module.exports = parseWhile;
