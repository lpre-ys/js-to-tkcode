'use strict';

const optimizeFor = require('./optimize-for');
const estraverse = require('estraverse');

// TODO test code
function optimize(ast) {
  estraverse.replace(ast, {
    enter: function (node) {
      switch (node.type) {
        case 'ForStatement':
          {
            this.skip();
            return optimizeFor(node);
          }
      }
    }
  });
}

module.exports = optimize;
