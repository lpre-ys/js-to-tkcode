import literal from '../literal.js';
import optimizeConst from '../optimizer/optimize-const.js';

function parseCall(node, parser) {
  const tkMock = parser.tkMock;
  const callee = node.callee;
  if (callee.type === 'MemberExpression' && callee.object.name === tkMock.name) {
    const funcName = callee.property.name;
    const args = node.arguments.map(argNode => extractArgValue(argNode, tkMock.Const));
    const ret = tkMock[funcName](...args);
    parser.appendOutput(ret);
  } else {
    // TODO function parser
  }
}

function extractArgValue(argNode, Const) {
  switch (argNode.type) {
    case 'Literal':
      return argNode.value;
    case 'ArrayExpression':
      return argNode.elements.map(el => el.value);
    case 'TemplateLiteral':
      return argNode.quasis.reduce((result, quasi, i) => {
        const expr = i < argNode.expressions.length
          ? extractArgValue(argNode.expressions[i], Const)
          : '';
        return result + quasi.value.cooked + expr;
      }, '');
    case 'BinaryExpression': {
      const left = extractArgValue(argNode.left, Const);
      const right = extractArgValue(argNode.right, Const);
      return literal.applyBinaryOp(left, argNode.operator, right);
    }
    case 'UnaryExpression':
      return literal.getLiteralVar(argNode);
    case 'MemberExpression': {
      const resolved = optimizeConst(argNode, Const);
      if (resolved.type !== 'MemberExpression') {
        return extractArgValue(resolved, Const);
      }
      throw Error(`未解決のMemberExpression: ${argNode.object?.object?.name}.${argNode.object?.property?.name}.${argNode.property?.name}`);
    }
    default:
      throw Error(`未対応のarguments.type: ${argNode.type}`);
  }
}

export default parseCall;
