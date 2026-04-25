import estraverse from 'estraverse';
import optimizeFor from './optimize-for.js';
import optimizeConst from './optimize-const.js';
import FunctionOptimizer from './function-optimizer.js';


function optimize(ast, Const) {
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

  return ast;
}

export default optimize;
