'use strict';

const tkVarManager = require('../tk-var-manager');
const tmpVarFactory = require('../tmp-var-factory');

function parseVar(node) {
  switch (node.type) {
    case 'Identifier': {
      const varNumber = tkVarManager.getVarNumber(node.name);
      return varNumber;
    }
    case 'MemberExpression': {
      if (node.property.type !== 'Literal') {
        throw Error(`parseVar 不正なプロパティです: ${JSON.stringify(node.property)}`);
      }
      if (node.object.name === tmpVarFactory.TMP_ARR_NAME) {
        const varNumber = tkVarManager.getTmpVarNumber(node.property.value);
        return varNumber;
      } else {
        return tkVarManager.getVarNumber(node.object.name) + node.property.value;
      }
    }
    default: {
      throw Error(`parseVar 未定義のtype呼び出し: ${JSON.stringify(node)}`);
    }
  }
}

module.exports = parseVar;
