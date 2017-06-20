'use strict';

const parseTest = require('./parse-test');

function parseIf(node, parser) {
  let {test, consequent, alternate} = node;
  if (test.type === 'Literal' && typeof test.value === 'boolean') {
    // booleanの場合、固定でなんやかんやするなんやかんや……？なんやかんやー
    if (test.value) {
      parser.parseAst(consequent);
    } else if (alternate) {
      parser.parseAst(alternate);
    }
  } else if (isLiteralEqual(test)) {
    // リテラル == リテラルの場合も崩す
    if (test.right.value == test.left.value) {
      parser.parseAst(consequent);
    } else if (alternate) {
      parser.parseAst(alternate);
    }
  } else {
    // 普通のIF
    parseTest(test, parser.outputs, !!alternate);
    consequent.type = 'Program';
    parser.parseAst(consequent);
    if (alternate) {
      parser.outputs.push(`Else`);
      parser.parseAst(alternate);
    }
    parser.outputs.push(`EndIf`);
  }
}

function isLiteralEqual(test) {
  if (!test.right || !test.left) {
    return false;
  }
  if (test.right.type == 'Literal'
    && test.left.type == 'Literal'
    && test.operator == '==') {
      return true;
  }
  return false;
}

module.exports = parseIf;
