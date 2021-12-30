'use strict';

const esprima = require('esprima');
const escodegen = require('escodegen');
const estraverse = require('estraverse');

const literal = require('../literal');
const optimizeConst = require('./optimize-const');

function optimizeFor(node, Const) {
  // pre perseが必要
  const init = node.init.declarations[0].init.value;
  const varName = node.init.declarations[0].id.name;
  // init, test, update
  let max = getMaxValue(node.test.right, Const);
  // 以下を疑似的に再現
  if (node.test.operator === '<=') {
    max += 1;
  }
  const add = 1;  //TODO
  // 複雑な条件文には対応しない
  let result = esprima.parse(`{}`).body[0];
  for (let i = init; i < max; i += add) {
    // TODO body parse
    const bodyAst = esprima.parse(escodegen.generate(node.body));
    estraverse.replace(bodyAst, {
      leave: function (subNode) {
        // TODO String
        if (subNode.type === 'Identifier'
          && subNode.name == varName) {
            const value = i;
            return {
              type: 'Literal',
              value: value,
              raw: `${value}`
            };
        }
      }
    });
    result.body.push(bodyAst);
  }
  return result;
}

function getMaxValue(node, Const) {
  if (node.type === 'Literal') {
    return node.value;
  }
  if (node.type === 'MemberExpression') {
    return getConstValue(node, Const);
  }
  if (node.type === 'BinaryExpression') {
    // まずはconstを崩す
    if (node.left.type === 'MemberExpression') {
      node.left = optimizeConst(node.left, Const);
    }
    if (node.right.type === 'MemberExpression') {
      node.right = optimizeConst(node.right, Const);
    }
    if (!literal.isLiteralTest(node)) {
      throw Error('optimizerFor 対応外のMAX指定です: ${JSON.stringify(node)}');
    }
    return eval(`${literal.getLiteralVar(node.left)} ${node.operator} ${literal.getLiteralVar(node.right)}`);
  }
}

function getConstValue(node, Const) {
  if (node.property.type !== 'Identifier') {
    throw Error(`optimizeFor 不正なMAX指定です: ${JSON.stringify(node)}`);
  }
  return Const[node.property.name];
}

module.exports = optimizeFor;
