'use strict';

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

function isLiteral(node) {
  if (!node) {
    return false;
  }
  if (node.type === 'Literal' || isUnary(node)) {
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

function parseLiteralBinary(node) {
  return eval(`${getLiteralVar(node.left)} ${node.operator} ${getLiteralVar(node.right)}`);
}

module.exports = {
  isLiteralTest,
  isLiteral,
  getLiteralVar,
  parseLiteralBinary
};
