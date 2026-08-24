import estraverse from 'estraverse';
import optimizeFor from './optimize-for.js';
import optimizeConst from './optimize-const.js';
import optimizeConstVars from './optimize-const-vars.js';
import FunctionOptimizer from './function-optimizer.js';


function optimize(ast, Const) {
  // トップレベルのconst宣言をコンパイル時に評価し、値をスコープに退避（宣言文自体はASTから削除）
  const constVarScope = optimizeConstVars.collectTopLevelConsts(ast, Const);
  // for文の上限指定など、関数の外側でだけ先に解決しておく（関数の中はパラメータによる
  // シャドーイングがあり得るため、関数展開が終わるまで踏み込まない）
  optimizeConstVars.inlineConstVars(ast, constVarScope, { topLevelOnly: true });
  const functionOptimizer = new FunctionOptimizer();
  // 基本のoptimizeと、functionを退避
  estraverse.replace(ast, {
    enter: function (node) {
      switch (node.type) {
        case 'ForStatement': {
          // this.skip();
          return optimizeFor(node, Const);
        }
        case 'MemberExpression': {
          const newNode = optimizeConst(node, Const);
          if (newNode) {
            return newNode;
          }
          break;
        }
      }
    },
    leave: function (node) {
      switch (node.type) {
        case 'FunctionDeclaration': {
          const name = node.id.name;
          functionOptimizer.addFunction(name, node);
          return null;
        }
        case 'Program': {
          // nullのnodeを削除する
          node.body = node.body.filter((v) => { return v; });
          break;
        }
      }
    }
  });
  estraverse.replace(ast, {
    enter: function (node) {
      switch (node.type) {
        case 'ExpressionStatement': {
          if (node.expression.type === 'CallExpression') {
            const exp = node.expression;
            const funcNode = functionOptimizer.getNode(exp.callee.name, exp.arguments);
            if (funcNode) {
              return funcNode;
            }
          }
          break;
        }
      }
    }
  });

  // 関数のインライン展開が終わったフラットな状態で、退避しておいたconst変数の参照を解決する
  optimizeConstVars.inlineConstVars(ast, constVarScope);

  return ast;
}

export default optimize;
