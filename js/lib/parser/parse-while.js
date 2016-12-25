'use strict';

const parseTest = require('./parse-test');

function parseWhile(node, parser) {
  parser.outputs.push(`Loop`);
  if (parseTest(node.test, parser.outputs)) {
    // test句が有効な場合のみ、break文を自動で挟む
    parser.outputs.push(`Break`);
    parser.outputs.push(`EndIf`);
  }
  parser.parseAst(node.body);
  parser.outputs.push(`EndLoop`);
}

module.exports = parseWhile;
