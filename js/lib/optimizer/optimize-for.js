'use strict';

const esprima = require('esprima');
const escodegen = require('escodegen');
const estraverse = require('estraverse');

function optimizeFor(node) {
  // pre perseが必要
  const init = node.init.declarations[0].init.value;
  const varName = node.init.declarations[0].id.name;
  // init, test, update
  const max = node.test.right.value;
  const add = 1;  //TODO
  // 複雑な条件文には対応しない
  // console.log(node.body);
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

module.exports = optimizeFor;
