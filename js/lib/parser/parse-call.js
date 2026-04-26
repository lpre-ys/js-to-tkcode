function parseCall(node, parser) {
  const tkMock = parser.tkMock;
  const callee = node.callee;
  if (callee.type === 'MemberExpression' && callee.object.name === tkMock.name) {
    const funcName = callee.property.name;
    const args = node.arguments.map(argNode => extractArgValue(argNode));
    const ret = tkMock[funcName](...args);
    parser.appendOutput(ret);
  } else {
    // TODO function parser
  }
}

function extractArgValue(argNode) {
  switch (argNode.type) {
    case 'Literal':
      return argNode.value;
    case 'ArrayExpression':
      return argNode.elements.map(el => el.value);
    case 'TemplateLiteral':
      return argNode.quasis.reduce((result, quasi, i) => {
        const expr = i < argNode.expressions.length
          ? extractArgValue(argNode.expressions[i])
          : '';
        return result + quasi.value.cooked + expr;
      }, '');
    default:
      throw Error(`未対応のarguments.type: ${argNode.type}`);
  }
}

export default parseCall;
