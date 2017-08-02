'use strict';

const parseTest = require('./parse-test');

function parseWhile(node, parser) {
  parser.outputs.push(`Loop`);
  if (parseTest(node.test, parser)) {
    // test句が有効な場合のみ、break文を入れる
    parser.parseAst(node.body);
    parser.outputs.push(`Else`);
    parser.outputs.push(`Break`);
    parser.outputs.push(`EndIf`);
  } else {
    parser.parseAst(node.body);
  }
  parser.outputs.push(`EndLoop`);
}

module.exports = parseWhile;
