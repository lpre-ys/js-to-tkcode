const UNARY_OPS = {
  '-': v => -v,
  '+': v => +v,
  '!': v => !v,
  '~': v => ~v,
};

const BINARY_OPS = {
  '+': (l, r) => l + r,
  '-': (l, r) => l - r,
  '*': (l, r) => l * r,
  '/': (l, r) => l / r,
  '%': (l, r) => l % r,
  '<': (l, r) => l < r,
  '>': (l, r) => l > r,
  '<=': (l, r) => l <= r,
  '>=': (l, r) => l >= r,
  '==': (l, r) => l == r,
  '===': (l, r) => l === r,
  '!=': (l, r) => l != r,
  '!==': (l, r) => l !== r,
};

function isLiteralTest(test) {
  if (!test.right || !test.left) {
    return false;
  }
  if ((test.right.type == 'Literal' || isUnary(test.right))
    && (test.left.type == 'Literal' || isUnary(test.left))) {
      return true;
  }
  return false;
}

function isLiteral(node) {
  if (!node) {
    return false;
  }
  if (node.type === 'Literal' || isUnary(node)) {
    return true;
  }

  return false;
}

function isUnary(node) {
  if (node.type == 'UnaryExpression') {
    return true;
  }
  return false;
}

// TODO 他でも使う気がする……
function getLiteralVar(node) {
  if (isUnary(node)) {
    return UNARY_OPS[node.operator](node.argument.value);
  } else {
    return node.value;
  }
}

function parseLiteralBinary(node) {
  return BINARY_OPS[node.operator](getLiteralVar(node.left), getLiteralVar(node.right));
}

function applyBinaryOp(left, operator, right) {
  return BINARY_OPS[operator](left, right);
}

export default {
  isLiteralTest,
  isLiteral,
  getLiteralVar,
  parseLiteralBinary,
  applyBinaryOp
};
