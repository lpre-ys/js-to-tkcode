import estraverse from 'estraverse';
import evalConstExpr from '../const-eval.js';

// 値をコンパイル時に決まるASTノードに戻せる型のみ定数畳み込みの対象にする。
// Date等のオブジェクトはリテラル化できないため対象外（宣言はそのまま残る）。
function valueToNode(value) {
  if (value === null) {
    return { type: 'Literal', value: null };
  }
  if (Array.isArray(value)) {
    return { type: 'ArrayExpression', elements: value.map(valueToNode) };
  }
  if (typeof value === 'number' && value < 0) {
    return {
      type: 'UnaryExpression',
      operator: '-',
      prefix: true,
      argument: { type: 'Literal', value: -value }
    };
  }
  if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
    return { type: 'Literal', value };
  }
  throw Error(`定数として畳み込めない値です: ${typeof value}`);
}

// トップレベルのconst宣言と同名の変数が、関数パラメータ・ローカル変数宣言・catch節などで
// 再宣言（シャドーイング）されていないか調べる。シャドーイングされている名前は、
// スコープ解析までは踏み込まず安全側に倒して畳み込み対象から除外する。
function findShadowedNames(ast) {
  const topLevelDeclarators = new Set();
  ast.body.forEach((node) => {
    if (node.type === 'VariableDeclaration') {
      node.declarations.forEach((decl) => topLevelDeclarators.add(decl));
    }
  });

  const shadowed = new Set();
  estraverse.traverse(ast, {
    enter: function (node) {
      switch (node.type) {
        case 'VariableDeclarator':
          if (node.id.type === 'Identifier' && !topLevelDeclarators.has(node)) {
            shadowed.add(node.id.name);
          }
          break;
        case 'FunctionDeclaration':
        case 'FunctionExpression':
        case 'ArrowFunctionExpression':
          node.params.forEach((p) => {
            if (p.type === 'Identifier') {
              shadowed.add(p.name);
            }
          });
          if (node.id) {
            shadowed.add(node.id.name);
          }
          break;
        case 'CatchClause':
          if (node.param && node.param.type === 'Identifier') {
            shadowed.add(node.param.name);
          }
          break;
      }
    }
  });
  return shadowed;
}

// Program直下のtop-levelなconst宣言だけを対象にする。
// 関数の中までスコープ解析すると事実上のインタプリタになってしまうため、意図的に対象外。
function collectTopLevelConsts(ast, Const) {
  const shadowedNames = findShadowedNames(ast);
  const scope = {};
  ast.body = ast.body.filter((node) => {
    if (node.type !== 'VariableDeclaration' || node.kind !== 'const') {
      return true;
    }
    const resolved = [];
    for (const decl of node.declarations) {
      if (!decl.init || decl.id.type !== 'Identifier' || shadowedNames.has(decl.id.name)) {
        return true;
      }
      try {
        const value = evalConstExpr(decl.init, Const, scope);
        valueToNode(value);
        resolved.push({ name: decl.id.name, value });
      } catch (e) {
        return true;
      }
    }
    resolved.forEach(({ name, value }) => { scope[name] = value; });
    return false;
  });
  return scope;
}

function isParam(node, parent) {
  return (
    parent.type === 'FunctionDeclaration'
    || parent.type === 'FunctionExpression'
    || parent.type === 'ArrowFunctionExpression'
  ) && parent.params.includes(node);
}

function isPropertyKey(node, parent) {
  return (
    (parent.type === 'MemberExpression' && parent.property === node && !parent.computed)
    || (parent.type === 'Property' && parent.key === node && !parent.computed)
  );
}

// VariableDeclaratorのid、catch節のparam、関数宣言/式の名前は「宣言」であって値の参照ではない
function isDeclarationId(node, parent) {
  return (
    (parent.type === 'VariableDeclarator' && parent.id === node)
    || (parent.type === 'CatchClause' && parent.param === node)
    || ((parent.type === 'FunctionDeclaration' || parent.type === 'FunctionExpression') && parent.id === node)
  );
}

// topLevelOnly=trueの場合、関数の中には一切踏み込まない。
// ForStatement等の最適化がトップレベルの参照を必要とするため、それらの最適化パスより前に先行実行する。
function inlineConstVars(ast, scope, { topLevelOnly = false } = {}) {
  if (Object.keys(scope).length === 0) {
    return ast;
  }
  estraverse.replace(ast, {
    enter: function (node, parent) {
      if (
        topLevelOnly
        && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression')
      ) {
        this.skip();
        return undefined;
      }
      if (
        node.type === 'Identifier'
        && Object.prototype.hasOwnProperty.call(scope, node.name)
        && parent
        && !isParam(node, parent)
        && !isPropertyKey(node, parent)
        && !isDeclarationId(node, parent)
      ) {
        // shorthandの{ x }はkey/valueが別ノードのため、value側を置換しただけでは
        // escodegenがshorthand表記のままkeyだけ出力してしまう。フラグごと解除する。
        if (parent.type === 'Property' && parent.value === node && parent.shorthand) {
          parent.shorthand = false;
        }
        return valueToNode(scope[node.name]);
      }
      return undefined;
    }
  });
  return ast;
}

export default {
  collectTopLevelConsts,
  inlineConstVars
};
