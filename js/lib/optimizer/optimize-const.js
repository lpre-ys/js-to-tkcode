'use strict';

const escodegen = require('escodegen');

function optimizeConst(node, Const) {
  const code = escodegen.generate(node);
  if (code.startsWith('tkMock.Const') && Object.keys(Const).includes(node.property.name)) {
    const value =  Const[node.property.name];
    if (value < 0) {
      return {
        "type": "UnaryExpression",
        "operator": "-",
        "argument": {
            "type": "Literal",
            "value": value * -1,
        },
        "prefix": true
      };
    } else {
      return {"type": "Literal", "value": value};
    }
  }
  return node;
}

module.exports = optimizeConst;

/*

*/
