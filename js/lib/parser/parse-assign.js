'use strict';

const parseVar = require('./parse-var');

function parseAssign(node, outputs) {
  const left = parseVar(node.left);
  const right = node.right;
  const opeNumber = Operators[node.operator.substr(0, 1)];
  switch (right.type) {
    case 'Literal': {
      if(typeof right.value === 'boolean') {
        outputs.push(`Switch(0, ${left}, ${left}, ${right.value ? 0 : 1})`);
      } else {
        outputs.push(`Variable(0, ${left}, ${left}, ${opeNumber}, 0, ${right.value}, 0)`);
      }
      break;
    }
    case 'MemberExpression':
    case 'Identifier': {
      const rightNumber = parseVar(right);
      outputs.push(`Variable(0, ${left}, ${left}, ${opeNumber}, 1, ${rightNumber}, 0)`);
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
