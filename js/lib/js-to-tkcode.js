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
    this.outputs = [];
    tkVarManager.setOptions(options);
    const tkMock = new TkMock();
    this.parser = new Parser(tkMock);
  }
  translate(script, isTmp = false) {
    const ast = esprima.parse(script);
    const optimized = optimize(ast);
    this.parser.parseAst(optimized, isTmp);

    return this.parser.outputs.join("\n");
  }
}

module.exports = JsToTkcode;
