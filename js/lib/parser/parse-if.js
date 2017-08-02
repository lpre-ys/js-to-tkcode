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
  } else if (isLiteralTest(test)) {
    // リテラル同士の比較も崩す
    const checkResult = eval(`${getLiteralVar(test.left)} ${test.operator} ${getLiteralVar(test.right)}`);
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

function isLiteralTest(test) {
  if (!test.right || !test.left) {
    return false;
  }
  if ((test.right.type == 'Literal' || isUnary(test.right))
    && (test.left.type == 'Literal' || isUnary(test.left))) {
      return true;
  }
  return false;
}

function isUnary(node) {
  if (node.type == 'UnaryExpression') {
    return true;
  }
  return false;
}

// TODO 他でも使う気がする……
function getLiteralVar(node) {
  if (isUnary(node)) {
    return eval(`0 ${node.operator} ${node.argument.value}`);
  } else {
    return node.value;
  }
}

module.exports = parseIf;
