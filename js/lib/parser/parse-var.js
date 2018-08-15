'use strict';

const tkVarManager = require('../tk-var-manager');
const tmpVarFactory = require('../tmp-var-factory');
const esprima = require('esprima');

function parseVar(node, parser = false) {
  switch (node.type) {
    case 'Identifier': {
      const varNumber = tkVarManager.getVarNumber(node.name);
      return varNumber;
    }
    case 'MemberExpression': {
      if (node.property.type === 'Identifier') {
        if (parser === false) {
          throw Error(`parseVar Parser指定なしで、添え字が変数の配列パースは出来ません: ${JSON.stringify(node)}`);
        }
        // 変数番を計算する
        const tmpName = tmpVarFactory.make();
        const baseNumber = tkVarManager.getVarNumber(node.object.name);
        const indexName = node.property.name;
        const tmpIndex = tmpVarFactory.tmpIndex - 1;
        parser.parseAst(esprima.parse(`${tmpName} = ${baseNumber}; ${tmpName} += ${indexName}`), true);
        return {isArray: true, indexVarNum: tkVarManager.getTmpVarNumber(tmpIndex)};
      }
      if (node.property.type === 'BinaryExpression') {
        // TODO 未テスト
        if (node.property.left.type !== 'Literal' || node.property.right.type !== 'Literal') {
          throw Error(`parseVar 未対応の添え字式です: ${JSON.stringify(node.property)}`);
        }
        let index = 0;
        if (node.property.operator === "+") {
          index = node.property.left.value + node.property.right.value;
        } else if (node.property.operator === "-") {
          index = node.property.left.value - node.property.right.value;
        } else {
          throw Error(`parseVar 未対応の添え字式です: ${JSON.stringify(node.property)}`);
        }
        return tkVarManager.getVarNumber(node.object.name) + index;
      }
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
