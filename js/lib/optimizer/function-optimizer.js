const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

class FunctionOptimizer{
  constructor() {
    this.functions = {};
  }

  addFunction(name, node) {
    this.functions[name] = node;
  }

  getFunction(name) {
    if (this.functions[name]) {
      return this.functions[name];
    } else {
      return false;
    }
  }

  getNode(name, args) {
    const node = this.getFunction(name);
    if (!node) {
      return false;
    }

    const ret = esprima.parse(escodegen.generate(node.body)).body[0];

    if (args.length > 0) {
      // パラメータのハッシュを作成
      const argMap = {};
      args.forEach((arg, i) => {
        argMap[node.params[i].name] = arg;
      });

      // ハッシュをもとに置換
      estraverse.replace(ret, {
        leave: function (node) {
          switch (node.type) {
            case 'Identifier': {
              if (Object.keys(argMap).includes(node.name)) {
                return argMap[node.name];
              }
              break;
            }
          }
        }
      });
    }

    return ret;
  }
}

module.exports = FunctionOptimizer;
