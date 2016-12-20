'use strict';

const esprima = require('esprima');
const estraverse = require('estraverse');
// const escodegen = require('escodegen');

const tkVarManager = require('./tk-var-manager');
const tmpVarFactory = require('./tmp-var-factory');

const optimize = require('./optimizer/optimize');

const parseTest = require('./parser/parse-test');
const parseAssign = require('./parser/parse-assign');
const parseBinary = require('./parser/parse-binary');
const parseIf = require('./parser/parse-if');
const parseWhile = require('./parser/parse-while');

// TODO モジュールの構成を変える
// TODO 各パースメソッドをクラスとして分離したい
//      ->親parseAstに依存する処理があるのでは……？
//      ->親を引数に持たせる？
//      ->発想を逆転させる？
//      ->そもそもクラス/instanceである必要性無いのでは？
//      ->outputsを引数にもつ関数にする
//      ->各種parseから副作用をなくして、全部関数をexportsしちゃえばよいのでは！？
class JsToTkcode {
  constructor(options) {
    this.outputs = [];
    tkVarManager.setOptions(options);
  }
  get output() {
    console.log(this.outputs.join("\n"));
    return this.outputs.join("\n");
  }
  translate(script, isTmp = false) {
    const ast = esprima.parse(script);
    optimize(ast);
    this.parseAst(ast, isTmp);
  }
  parseAst(ast, isTmp = false) {
    const that = this;
    // TODO functionのパース
    estraverse.replace(ast, {
      enter: function (node) {
        switch (node.type) {
          case 'IfStatement': {
            parseIf(node, that.outputs, that);
            this.skip();
            break;
          }
          case 'WhileStatement': {
            parseWhile(node, that.outputs, that);
            this.skip();
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
            parseAssign(node, that.outputs);
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

module.exports = JsToTkcode;
