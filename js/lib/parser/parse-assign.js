'use strict';

const parseVar = require('./parse-var');

function parseAssign(node, parser) {
  let left = parseVar(node.left, parser);
  let leftType = 0;
  if (typeof left == 'object') {
    left = left.indexVarNum;
    leftType = 2;
  }
  const right = node.right;
  const opeNumber = Operators[node.operator.substr(0, 1)];
  switch (right.type) {
    case 'Literal': {
      if(typeof right.value === 'boolean') {
        parser.outputs.push(`Switch(${leftType}, ${left}, ${leftType == 2 ? 0 : left}, ${right.value ? 0 : 1})`);
      } else {
        parser.outputs.push(`Variable(${leftType}, ${left}, ${leftType == 2 ? 0 : left}, ${opeNumber}, 0, ${right.value}, 0)`);
      }
      break;
    }
    case 'UnaryExpression': {
      if (right.operator !== '-') {
        throw Error(`parseAssignにて未対応の右辺: ${JSON.stringify(node.right)}`);
      }
      parser.outputs.push(`Variable(${leftType}, ${left}, ${leftType == 2 ? 0 : left}, ${opeNumber}, 0, ${right.argument.value * -1}, 0)`);
      break;
    }
    case 'MemberExpression':
    case 'Identifier': {
      let rightNumber = parseVar(right, parser);
      let rightType = 1;
      if (typeof rightNumber == 'object') {
        rightNumber = rightNumber.indexVarNum;
        rightType = 2;
      }
      parser.outputs.push(`Variable(${leftType}, ${left}, ${leftType == 2 ? 0 : left}, ${opeNumber}, ${rightType}, ${rightNumber}, 0)`);
      break;
    }
    default: {
      throw Error(`parseAssignにて未対応の右辺: ${JSON.stringify(node.right)}`);
    }
  }
}

const Operators = {
  '=' : 0,
  '+' : 1,
  '-' : 2,
  '*' : 3,
  '/' : 4,
  '%' : 5
};

module.exports = parseAssign;
