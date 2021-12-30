'use strict';

const parseTest = require('./parse-test');
const literal = require('../literal');

function parseIf(node, parser) {
  let {test, consequent, alternate} = node;
  if (test.type === 'Literal' && typeof test.value === 'boolean') {
    // booleanの場合、固定でなんやかんやするなんやかんや……？なんやかんやー
    if (test.value) {
      parser.parseAst(consequent);
    } else if (alternate) {
      parser.parseAst(alternate);
    }
  } else if (literal.isLiteralTest(test)) {
    // リテラル同士の比較も崩す
    const checkResult = eval(`${literal.getLiteralVar(test.left)} ${test.operator} ${literal.getLiteralVar(test.right)}`);
    if (checkResult) {
      parser.parseAst(consequent);
    } else if (alternate) {
      parser.parseAst(alternate);
    }
  } else if (literal.isLiteral(test.right) && literal.isLiteralTest(test.left)) {
    // 左項が定数式、右が定数の場合
    const leftResult = literal.parseLiteralBinary(test.left);
    const checkResult = eval(`${leftResult} ${test.operator} ${literal.getLiteralVar(test.right)}`);
    if (checkResult) {
      parser.parseAst(consequent);
    } else if (alternate) {
      parser.parseAst(alternate);
    }
  } else {
    // 普通のIF
    parseTest(test, parser, !!alternate);
    consequent.type = 'Program';
    parser.parseAst(consequent);
    if (alternate) {
      parser.outputs.push(`Else`);
      parser.parseAst(alternate);
    }
    parser.outputs.push(`EndIf`);
  }
}

module.exports = parseIf;
