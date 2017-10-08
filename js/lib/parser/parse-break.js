'use strict';

function parseBreak(node, parser = false) {
  // 固定でbreakするだけ
  parser.outputs.push(`Break`);
}

module.exports = parseBreak;
