import literal from './literal.js';
import optimizeConst from './optimizer/optimize-const.js';

// JSのAST式ノードを、eval()を使わずコンパイル時に評価するための許可リスト方式インタプリタ。
// ここに無いnode.typeは意図的に未対応（未知のASTを安全側に倒してエラーにするため）。
function evalConstExpr(node, Const, scope = {}) {
  switch (node.type) {
    case 'Literal':
      return node.value;
    case 'Identifier': {
      if (Object.prototype.hasOwnProperty.call(scope, node.name)) {
        return scope[node.name];
      }
      throw Error(`未解決の変数参照: ${node.name}`);
    }
    case 'ArrayExpression':
      return node.elements.map(el => evalConstExpr(el, Const, scope));
    case 'TemplateLiteral':
      return node.quasis.reduce((result, quasi, i) => {
        const expr = i < node.expressions.length
          ? evalConstExpr(node.expressions[i], Const, scope)
          : '';
        return result + quasi.value.cooked + expr;
      }, '');
    case 'BinaryExpression': {
      const left = evalConstExpr(node.left, Const, scope);
      const right = evalConstExpr(node.right, Const, scope);
      return literal.applyBinaryOp(left, node.operator, right);
    }
    case 'LogicalExpression': {
      const left = evalConstExpr(node.left, Const, scope);
      switch (node.operator) {
        case '&&':
          return left ? evalConstExpr(node.right, Const, scope) : left;
        case '||':
          return left ? left : evalConstExpr(node.right, Const, scope);
        default:
          throw Error(`未対応の論理演算子: ${node.operator}`);
      }
    }
    case 'ConditionalExpression': {
      const test = evalConstExpr(node.test, Const, scope);
      return test
        ? evalConstExpr(node.consequent, Const, scope)
        : evalConstExpr(node.alternate, Const, scope);
    }
    case 'UnaryExpression': {
      const value = evalConstExpr(node.argument, Const, scope);
      return literal.applyUnaryOp(node.operator, value);
    }
    case 'NewExpression': {
      const ctorName = node.callee.name;
      const Ctor = globalThis[ctorName];
      if (typeof Ctor !== 'function') {
        throw Error(`未対応のコンストラクタ: ${ctorName}`);
      }
      const args = node.arguments.map(argNode => evalConstExpr(argNode, Const, scope));
      return new Ctor(...args);
    }
    case 'CallExpression': {
      if (node.callee.type !== 'MemberExpression') {
        throw Error(`未対応のCallExpression: callee.type=${node.callee.type}`);
      }
      const obj = evalConstExpr(node.callee.object, Const, scope);
      const methodName = node.callee.property.name;
      if (typeof obj?.[methodName] !== 'function') {
        throw Error(`未対応のメソッド呼び出し: ${methodName}`);
      }
      const args = node.arguments.map(argNode => evalConstExpr(argNode, Const, scope));
      return obj[methodName](...args);
    }
    case 'MemberExpression': {
      const resolved = optimizeConst(node, Const);
      if (resolved.type !== 'MemberExpression') {
        return evalConstExpr(resolved, Const, scope);
      }
      throw Error(`未解決のMemberExpression: ${node.object?.object?.name}.${node.object?.property?.name}.${node.property?.name}`);
    }
    default:
      throw Error(`未対応のarguments.type: ${node.type}`);
  }
}

export default evalConstExpr;
