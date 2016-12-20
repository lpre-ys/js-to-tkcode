'use strict';

const parseTest = require('./parse-test');

function parseIf(node, outputs, that) {
  let {test, consequent, alternate} = node;
  parseTest(test, outputs);
  consequent.type = 'Program';
  that.parseAst(consequent);
  if (alternate) {
    outputs.push(`Else`);
    that.parseAst(alternate);
  }
  outputs.push(`EndIf`);
}

module.exports = parseIf;
