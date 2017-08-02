'use strict';

const esprima = require('esprima');
// const estraverse = require('estraverse');
// const escodegen = require('escodegen');

const tkVarManager = require('./tk-var-manager');
const TkMock = require('../util/tk-mock');


const optimize = require('./optimizer/optimize');
const SqlOptimizer = require('./optimizer/sql-optimizer');
const Parser = require('./parser/parser');

class JsToTkcode {
  constructor(options) {
    tkVarManager.setOptions(options);
    this.TkMock = TkMock;
    this.tkMock = new TkMock(options.pjConst || {});
    this.parser = new Parser(this.tkMock);
    this.database = options.database;
    this.sqlOptimizer = false;
  }
  loadDatabase() {
    return new Promise((resolve, reject) => {
      if (!this.database) {
        resolve(true);
      } else {
        this.sqlOptimizer = new SqlOptimizer(this.database);
        this.sqlOptimizer.load().then(() => {
          resolve(true);
        });
      }
    });
  }
  translate(script, subConst = {}) {
    this.parser.reset();
    let ast = esprima.parse(script);
    if (this.sqlOptimizer) {
      ast = this.sqlOptimizer.optimize(ast);
    }
    const optimized = optimize(ast, Object.assign(this.tkMock.Const, subConst));
    this.parser.parseAst(optimized, false);

    return this.parser.outputs.join("\n");
  }
  resetConfig(options) {
    tkVarManager.setOptions(options);
    this.tkMock = new TkMock(options.pjConst || {});
  }
}

module.exports = JsToTkcode;
