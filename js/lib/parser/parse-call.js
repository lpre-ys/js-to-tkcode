import evalConstExpr from '../const-eval.js';

function parseCall(node, parser) {
  const tkMock = parser.tkMock;
  const callee = node.callee;
  if (callee.type === 'MemberExpression' && callee.object.name === tkMock.name) {
    const funcName = callee.property.name;
    const args = node.arguments.map(argNode => evalConstExpr(argNode, tkMock.Const));
    const ret = tkMock[funcName](...args);
    parser.appendOutput(ret);
  } else {
    // TODO function parser
  }
}

export default parseCall;
