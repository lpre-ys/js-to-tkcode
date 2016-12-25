const escodegen = require('escodegen');

function parseCall(node, parser) {
  const tkMock = parser.tkMock;
  const callee = node.callee;
  if (callee.type === 'MemberExpression' && callee.object.name === tkMock.name) {
    const code = escodegen.generate(node);
    eval(`parser.appendOutput(ret = ${code})`); // TODO eval......
  } else {
    // TODO function parser
  }
}

module.exports = parseCall;

// 古いコード
/*
const funcName = callee.property.name;
const args = [];
node.arguments.forEach((argNode) => {
  switch (argNode.type) {
    case 'Literal': {
      args.push(argNode.value);
      break;
    }
    case 'ArrayExpression': {
      // TODO 深い階層のパース。必要？
      const tmp = [];
      argNode.elements.forEach((aryNode) => {
        tmp.push(aryNode.value);
      });
      args.push(tmp);
      break;
    }
    default:
      throw Error(`未対応のargments.type: ${argNode.type}`);
  }
});
const ret = tkMock[funcName](args);
parser.appendOutput(ret);
*/
