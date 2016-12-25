'use strict';

const escodegen = require('escodegen');

function optimizeConst(node, Const) {
  const code = escodegen.generate(node);
  if (code.startsWith('tkMock.Const') && Object.keys(Const).includes(node.property.name)) {
    return {"type": "Literal", "value": Const[node.property.name]};
  }
  return node;
}

module.exports = optimizeConst;

/*

*/
