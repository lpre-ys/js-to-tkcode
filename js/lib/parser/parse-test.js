'use strict';

const parseVar = require('./parse-var');

function parseTest(node, outputs) {
  // test句のパース
  switch (node.type) {
    case 'BinaryExpression': {
      const varType = node.right.type === 'Literal' ? 0 : 1;
      const right = node.right.type === 'Literal' ? node.right.value : parseVar(node.right);
      outputs.push(`If(01, ${parseVar(node.left)}, ${varType}, ${right}, ${TestOperators[node.operator]}, 0)`);
      break;
    }
    case 'Identifier': {
      outputs.push(`If(00, ${parseVar(node)}, 0, 0, 0, 0)`);
      break;
    }
    case 'UnaryExpression': {
      outputs.push(`If(00, ${parseVar(node.argument)}, 1, 0, 0, 0)`);
      break;
    }
    case 'Literal': {
      return false;
    }
    default: {
      throw Error(`未対応のノードタイプです。: ${JSON.stringify(node)}`);
    }
  }

  return true;
}

const TestOperators = {
  '==' : 0,
  '>=' : 1,
  '<=' : 2,
  '>'  : 3,
  '<'  : 4,
  '!=' : 5
};

module.exports = parseTest;
