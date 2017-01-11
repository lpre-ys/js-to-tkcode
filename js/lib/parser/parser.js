'use strict';

const estraverse = require('estraverse');

const tmpVarFactory = require('../tmp-var-factory');

const parseAssign = require('./parse-assign');
const parseBinary = require('./parse-binary');
const parseIf = require('./parse-if');
const parseWhile = require('./parse-while');
const parseCall = require('./parse-call');

class Parser {
  constructor(tkMock) {
    this.outputs = [];
    if (tkMock) {
      tkMock.setOutputMode();
    }
    this.tkMock = tkMock;
  }

  appendOutput(args) {
    if (Array.isArray(args)) {
      this.outputs = this.outputs.concat(args);
    } else {
      this.outputs.push(args);
    }
  }

  reset() {
    this.outputs.length = 0;
  }

  parseAst(ast, isTmp = false) {
      const that = this;
      // TODO functionのパース
      estraverse.replace(ast, {
        enter: function (node) {
          switch (node.type) {
            case 'IfStatement': {
              parseIf(node, that);
              this.skip();
              break;
            }
            case 'WhileStatement': {
              parseWhile(node, that);
              this.skip();
              break;
            }
            case 'CallExpression': {
              parseCall(node, that);
              this.skip();
              break;
            }
            case 'ExpressionStatement': {
              // skip module
              if (node.expression.type == 'AssignmentExpression'
                  && node.expression.left.type == 'MemberExpression'
                  && node.expression.left.object.name == 'module') {
                this.skip();
              }
              break;
            }
          }
        },
        leave: function (node) {
          switch (node.type) {
            case 'BinaryExpression': {
              return parseBinary(node, that);
            }
            case 'AssignmentExpression': {
              parseAssign(node, that);
              break;
            }
            case 'ExpressionStatement': {
              if (!isTmp) {
                tmpVarFactory.reset();
              }
              break;
            }
          }
        }
      });

  }
}


module.exports = Parser;
