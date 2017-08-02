'use strict';

const parseVar = require('./parse-var');
const tkVarManager = require('../tk-var-manager');
const tmpVarFactory = require('../tmp-var-factory');

function parseTest(node, parser, hasElse = false) {
  // test句のパース
  const outputs = parser.outputs;
  switch (node.type) {
    case 'BinaryExpression': {
      const varType = node.right.type === 'Literal' ? 0 : 1;
      const right = node.right.type === 'Literal' ? node.right.value : parseVarForIf(node.right, parser);
      outputs.push(`If(01, ${parseVarForIf(node.left, parser)}, ${varType}, ${right}, ${TestOperators[node.operator]}, ${hasElse ? 1 : 0})`);
      break;
    }
    case 'Identifier': {
      outputs.push(`If(00, ${parseVar(node)}, 0, 0, 0, ${hasElse ? 1 : 0})`);
      break;
    }
    case 'MemberExpression': {
      outputs.push(`If(00, ${parseVarForIf(node, parser)}, 0, 0, 0, ${hasElse ? 1 : 0})`);
      break;
    }
    case 'UnaryExpression': {
      outputs.push(`If(00, ${parseVar(node.argument)}, 1, 0, 0, ${hasElse ? 1 : 0})`);
      break;
    }
    case 'CallExpression': {
      const args = node.arguments;
      const params = [];
      for (let i = 0; i < 5; i++) {
        if (args[i] !== undefined) {
          params.push(args[i].value);
        } else {
          params.push(0);
        }
      }
      params.push(hasElse ? 1 : 0);
      outputs.push(`If(${params.join(', ')})`);
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

function parseVarForIf(node, parser) {
  const v = parseVar(node, parser);
  let varNum = v;
  if (typeof v == 'object') {
    tmpVarFactory.make();
    const tmpVarNum = tkVarManager.getTmpVarNumber(tmpVarFactory.tmpIndex - 1);
    parser.outputs.push(`Variable(0, ${tmpVarNum}, ${tmpVarNum}, 0, 2, ${v.indexVarNum}, 0)`);
    varNum = tmpVarNum;
  }

  return varNum;
}

module.exports = parseTest;
