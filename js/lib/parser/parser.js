import estraverse from 'estraverse';
import tmpVarFactory from '../tmp-var-factory.js';
import parseAssign from './parse-assign.js';
import parseBinary from './parse-binary.js';
import parseIf from './parse-if.js';
import parseWhile from './parse-while.js';
import parseCall from './parse-call.js';
import parseBreak from './parse-break.js';



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
            case 'BreakStatement': {
              parseBreak(node, that);
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


export default Parser;
