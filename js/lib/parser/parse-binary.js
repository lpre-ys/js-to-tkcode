import esprima from 'esprima';
import escodegen from 'escodegen';
import tmpVarFactory from '../tmp-var-factory.js';


function parseBinary(node, parser) {
  let {
    operator,
    left,
    right
  } = node;
  if (!Object.keys(BinaryOperators).includes(operator)) {
    return {
      operator,
      left,
      right
    };
  }
  if (left.type === 'Literal' && right.type === 'Literal') {
    // 両方リテラルの場合、事前計算する（最適化）
    return optLiteralBinary(operator, left, right);
  }

  const leftCode = escodegen.generate(left);
  const rightCode = escodegen.generate(right);

  const tmpName = tmpVarFactory.make();
  parser.parseAst(esprima.parse(`${tmpName} = ${leftCode}; ${tmpName} ${operator}= ${rightCode}`), true);

  return esprima.parse(`${tmpName}`).body[0].expression;
}

function optLiteralBinary(operator, left, right) {
  let value, type;
  type = 'Literal';
  switch (operator) {
    case '+':
      {
        value = left.value + right.value;
        break;
      }
    case '-':
      {
        value = left.value - right.value;
        break;
      }
    case '*':
      {
        value = left.value * right.value;
        break;
      }
    case '/':
      {
        value = left.value / right.value;
        value = Math.floor(value);
        break;
      }
    case '%':
      {
        value = left.value % right.value;
        break;
      }
  }

  return {
    value,
    type
  };
}

const BinaryOperators = {
  '=' : 0,
  '+' : 1,
  '-' : 2,
  '*' : 3,
  '/' : 4,
  '%' : 5
};

export default parseBinary;
