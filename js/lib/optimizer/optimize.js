'use strict';

const estraverse = require('estraverse');

const optimizeFor = require('./optimize-for');
const optimizeConst = require('./optimize-const');
const FunctionOptimizer = require('./function-optimizer');

function optimize(ast) {
  const functionOptimizer = new FunctionOptimizer();
  // 基本のoptimizeと、functionを退避
  estraverse.replace(ast, {
    enter: function (node) {
      switch (node.type) {
        case 'ForStatement': {
          this.skip();
          return optimizeFor(node);
        }
        case 'MemberExpression': {
          const newNode = optimizeConst(node);
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

module.exports = optimize;
