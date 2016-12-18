'use strict';

const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

class Parser {
  constructor(tkMock) {
    this.outputs = [];
    this.tkMock = tkMock;
    this.tmpIndex = 0;  // TODO remove
    this.tmpVarFactory = require('./tmp-var-factory');
  }
  get output() {
    console.log(this.outputs.join("\n"));
    return this.outputs.join("\n");
  }
  parse(script, isTmp = false) {
    const ast = esprima.parse(script);
    // pre perse
    this.prePerse(ast);
    // console.log(escodegen.generate(ast));
    this.parseAst(ast, isTmp);
  }
  prePerse(ast) {
    const that = this;
    estraverse.replace(ast, {
      enter: function (node) {
        switch (node.type) {
          case 'ForStatement': {
            this.skip();
            return that.preParseFor(node);
          }
        }
      }
    });
  }
  parseAst(ast, isTmp = false) {
    const that = this;
    // TODO functionのパース
    estraverse.replace(ast, {
      enter: function (node) {
        switch (node.type) {
          case 'IfStatement': {
            that.parseIf(node);
            this.skip();
            break;
          }
          case 'WhileStatement': {
            that.parseWhile(node);
            this.skip();
            break;
          }
        }
      },
      leave: function (node) {
        switch (node.type) {
          case 'BinaryExpression': {
            return that.parseBinary(node);
          }
          case 'AssignmentExpression': {
            that.parseAssign(node);
            break;
          }
          case 'ExpressionStatement': {
            if (!isTmp) {
              that.tmpVarFactory.reset();
            }
            break;
          }
        }
      }
    });
  }
  preParseFor(node) {
    // pre perseが必要
    const init = node.init.declarations[0].init.value;
    const varName = node.init.declarations[0].id.name;
    // init, test, update
    const max = node.test.right.value;
    const add = 1;  //TODO
    // 複雑な条件文には対応しない
    // console.log(node.body);
    let result = esprima.parse(`{}`).body[0];
    for (let i = init; i < max; i += add) {
      // TODO body parse
      const bodyAst = esprima.parse(escodegen.generate(node.body));
      estraverse.replace(bodyAst, {
        leave: function (subNode) {
          if (subNode.type === 'Identifier'
            && subNode.name == varName) {
              const value = i;
              return {
                type: 'Literal',
                value: value,
                raw: `${value}`
              };
          }
        }
      });
      result.body.push(bodyAst);
    }


    return result;
  }
  parseWhile(node) {
    this.outputs.push(`Loop`);
    if (this.parseTest(node.test)) {
      // test句が有効な場合のみ、break文を自動で挟む
      this.outputs.push(`Break`);
      this.outputs.push(`EndIf`);
    }
    this.parseAst(node.body);
    this.outputs.push(`EndLoop`);
  }
  parseIf({test, consequent, alternate}) {
    this.parseTest(test);
    consequent.type = 'Program';
    this.parseAst(consequent);
    if (alternate) {
      this.outputs.push(`Else`);
      this.parseAst(alternate);
    }
    this.outputs.push(`EndIf`);
  }
  parseTest(node) {
    // test句のパース
    switch (node.type) {
      case 'BinaryExpression': {
        const varType = node.right.type === 'Literal' ? 0 : 1;
        const right = node.right.type === 'Literal' ? node.right.value : this.parseVar(node.right);
        this.outputs.push(`If(01, ${this.parseVar(node.left)}, ${varType}, ${right}, ${TestOperators[node.operator]}, 0)`);
        break;
      }
      case 'Identifier': {
        this.outputs.push(`If(00, ${this.parseVar(node)}, 0, 0, 0, 0)`);
        break;
      }
      case 'UnaryExpression': {
        this.outputs.push(`If(00, ${this.parseVar(node.argument)}, 1, 0, 0, 0)`);
        break;
      }
      case 'Literal': {
        return false;
      }
    }

    return true;
  }
  parseAssign(node) {
    const left = this.parseVar(node.left);
    const right = node.right;
    const opeNumber = BinaryOperators[node.operator.substr(0, 1)];
    switch (right.type) {
      case 'Literal': {
        if(typeof right.value === 'boolean') {
          this.outputs.push(`Switch(0, ${left}, ${left}, ${right.value ? 0 : 1})`);
        } else {
          this.outputs.push(`Variable(0, ${left}, ${left}, ${opeNumber}, 0, ${right.value}, 0)`);
        }
        break;
      }
      case 'MemberExpression':
      case 'Identifier': {
        const rightNumber = this.parseVar(right);
        this.outputs.push(`Variable(0, ${left}, ${left}, ${opeNumber}, 1, ${rightNumber}, 0)`);
        break;
      }
      default: {
        throw Error(`parseAssignにて未対応の右辺: ${JSON.stringify(node.right)}`);
      }
    }
  }
  parseVar(node) {
    switch (node.type) {
      case 'Identifier': {
        const varNumber = this.tkMock.getVarNumber(node.name);
        return varNumber;
      }
      case 'MemberExpression': {
        if (node.object.name !== this.tmpVarFactory.TMP_ARR_NAME) {
          throw Error(`parseVar オブジェクト変数は未対応です: ${JSON.stringify(node.object)}`);
        }
        if (node.property.type !== 'Literal') {
          throw Error(`parseVar 不正なプロパティです: ${JSON.stringify(node.property)}`);
        }
        const varNumber = this.tkMock.getTmpVarNumber(node.property.value);
        return varNumber;
      }
      default: {
        throw Error(`parseVar 未定義のtype呼び出し: ${JSON.stringify(node)}`);
      }
    }
  }
  parseBinary({operator, left, right}) {
    if (!Object.keys(BinaryOperators).includes(operator)) {
      return {operator, left, right};
    }
    if (left.type === 'Literal' && right.type === 'Literal') {
      // 両方リテラルの場合、事前計算する（最適化）
      return this.optLiteralBinary(operator, left, right);
    }

    const leftCode = escodegen.generate(left);
    const rightCode = escodegen.generate(right);

    const tmpName = this.tmpVarFactory.make();
    this.parse(`${tmpName} = ${leftCode}; ${tmpName} ${operator}= ${rightCode}`, true);

    return esprima.parse(`${tmpName}`).body[0].expression;
  }
  optLiteralBinary(operator, left, right) {
    let value, type;
    type = 'Literal';
    switch (operator) {
      case '+': {
        value = left.value + right.value;
        break;
      }
      case '-': {
        value = left.value - right.value;
        break;
      }
      case '*': {
        value = left.value * right.value;
        break;
      }
      case '/': {
        value = left.value / right.value;
        value = Math.floor(value);
        break;
      }
      case '%': {
        value = left.value % right.value;
        break;
      }
    }

    return {value, type};
  }
}

const BinaryOperators = {
  '=' : 0,
  '+' : 1,
  '-' : 2,
  '*' : 3,
  '/' : 4,
  '%' : 5
};
const TestOperators = {
  '==' : 0,
  '>=' : 1,
  '<=' : 2,
  '>'  : 3,
  '<'  : 4,
  '!=' : 5
};

const JsToTkcode = {
  'Parser': Parser
};

module.exports = JsToTkcode;
