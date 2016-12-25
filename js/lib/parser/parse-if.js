'use strict';

const parseTest = require('./parse-test');

function parseIf(node, parser) {
  let {test, consequent, alternate} = node;
  parseTest(test, parser.outputs);
  consequent.type = 'Program';
  parser.parseAst(consequent);
  if (alternate) {
    parser.outputs.push(`Else`);
    parser.parseAst(alternate);
  }
  parser.outputs.push(`EndIf`);
}

module.exports = parseIf;
