'use strict';

const esprima = require('esprima');
// const estraverse = require('estraverse');
// const escodegen = require('escodegen');

const tkVarManager = require('./tk-var-manager');
const TkMock = require('../util/tk-mock');


const optimize = require('./optimizer/optimize');
const Parser = require('./parser/parser');

class JsToTkcode {
  constructor(options) {
    tkVarManager.setOptions(options);
    this.TkMock = TkMock;
    this.tkMock = new TkMock(options.pjConst || {});
    this.parser = new Parser(this.tkMock);
  }
  translate(script, isTmp = false) {
    this.parser.reset();
    const ast = esprima.parse(script);
    const optimized = optimize(ast, this.tkMock.Const);
    this.parser.parseAst(optimized, isTmp);

    return this.parser.outputs.join("\n");
  }
  resetConfig(options) {
    tkVarManager.setOptions(options);
    this.tkMock = new TkMock(options.pjConst || {});
  }
}

module.exports = JsToTkcode;
