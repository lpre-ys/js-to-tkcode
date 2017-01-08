/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const m = __webpack_require__(1);
	const component = __webpack_require__(3);
	
	m.mount(document.getElementById('root'), component);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(21);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = vendor_library;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const m = __webpack_require__(1);
	const JsToTkcode = __webpack_require__(4);
	const yaml = __webpack_require__(27);
	
	const component = {
	  controller: function () {
	    const input = m.prop('');
	    const config = m.prop('');
	    // TODO
	    const varList = {
	      'test': 42,
	      'test2': 43,
	      'test3': 44
	    };
	    const tmpStart = 101;
	    const tmpEnd = 200;
	    const switchList = {
	      'isTest1': 21
	    };
	    const jsToTkcode = new JsToTkcode({varList, tmpStart, tmpEnd, switchList});
	    return {
	      input: input,
	      config: config,
	      getOutput: () => {
	        // TODO
	        let ret = '';
	        try {
	          ret = jsToTkcode.translate(input());
	        } catch (e) {
	          console.log(e);
	        }
	
	        return ret;
	      },
	      setConfig: (value) => {
	        config(value);
	        const configObj = yaml.load(value);
	        jsToTkcode.resetConfig(configObj);
	      }
	    };
	  },
	  view: (ctrl) => {
	    // const vm = ctrl.vm;
	    return m('.app', [
	      m('h1', 'JavaScript to TKcode'),
	      m('.main', [
	        m('h2', 'config'),
	        m('textarea#config', {
	          onkeyup: m.withAttr('value', ctrl.setConfig)
	        }, ctrl.config()),
	        m('h2', 'input'),
	        m('textarea#input', {
	          onkeyup: m.withAttr('value', ctrl.input)
	        }, ctrl.input()),
	        m('h2', 'output'),
	        m('textarea#output', {
	          readonly: 'readonly',
	          onfocus: (e) => { e.target.select(); }
	        }, ctrl.getOutput())
	      ])
	    ]);
	  }
	};
	
	module.exports = component;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const esprima = __webpack_require__(5);
	// const estraverse = require('estraverse');
	// const escodegen = require('escodegen');
	
	const tkVarManager = __webpack_require__(6);
	const TkMock = __webpack_require__(7);
	
	
	const optimize = __webpack_require__(12);
	const Parser = __webpack_require__(18);
	
	class JsToTkcode {
	  constructor(options) {
	    tkVarManager.setOptions(options);
	    this.TkMock = TkMock;
	    this.tkMock = new TkMock();
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
	  }
	}
	
	module.exports = JsToTkcode;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(1);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	class TkVarManager {
	  setOptions(options = {}) {
	    this.varList = options.varList || {};
	    this.switchList = options.switchList || {};
	    this.tmpStart = options.tmpStart;
	    this.tmpEnd = options.tmpEnd;
	  }
	  getVarNumber(name) {
	    if (this.varList[name]) {
	      return this.varList[name];
	    }
	    if(this.switchList[name]) {
	      return this.switchList[name];
	    }
	
	    throw new Error(`未定義の変数です。: ${name}`);
	  }
	
	  getTmpVarNumber(index) {
	    const number = this.tmpStart + index;
	    if (number < this.tmpStart || number > this.tmpEnd) {
	      throw new Error(`一時変数があふれました`);
	    }
	
	    return number;
	  }
	}
	const instance = new TkVarManager();
	module.exports = instance;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const executeLog = __webpack_require__(8);
	
	const KeyEntry = __webpack_require__(9);
	
	class TkMock {
	  constructor(prjConst = {}) {
	    this.state = 'test';
	    this.commands = [];
	    executeLog.reset();
	    // const merge
	    this.Const = __webpack_require__(11);
	    this.Const = Object.assign(this.Const, prjConst);
	    // set Functions;
	    const keyEntry = new KeyEntry();
	    this.keyEntry = (...args) => {
	      return keyEntry.execute.apply(keyEntry, args);
	    };
	    this.commands.push(keyEntry);
	    // const dir = __dirname + '/commands';
	    // const filelist = ['key-entry.js'];  // TODO
	    // filelist.forEach((filename) => {
	    //   const functionName = this.makeFunctionName(filename.slice(0, -3));
	    //   const cmdClass = require(dir + '/' + filename);
	    //   const instance = new cmdClass();
	    //   this[functionName] = (...args) => {
	    //     return instance.execute.apply(instance, args);
	    //   };
	    //   this.commands.push(instance);
	    // });
	  }
	  setOutputMode() {
	    this.state = 'output';
	    this.commands.forEach((command) => {
	      command.mode = 'output';
	    });
	  }
	  get name() {
	    return 'tkMock';
	  }
	  makeFunctionName(str) {
	    const ret = str.replace(/-./g, (matched) => {
	        return matched.charAt(1).toUpperCase();
	    });
	
	    return ret;
	  }
	  get log() {
	    return executeLog.log;
	  }
	}
	module.exports = TkMock;


/***/ },
/* 8 */
/***/ function(module, exports) {

	class ExecuteLog {
	  constructor() {
	    this.logs = [];
	  }
	
	  push(log) {
	    this.logs.push(log);
	  }
	
	  reset() {
	    this.logs.length = 0;
	  }
	
	  get last() {
	    if (this.logs.length == 0) {
	      return '';
	    }
	    return this.logs[this.logs.length - 1];
	  }
	
	  get log() {
	    return this.logs.join("\n");
	  }
	}
	
	const executeLog = new ExecuteLog();
	
	module.exports = executeLog;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const Command = __webpack_require__(10);
	const tkVarManager = __webpack_require__(6);
	
	const keys = ['enter', 'cancel', 'shift', 'down', 'left', 'right', 'up'];
	class KeyEntry extends Command {
	
	  run(receive, push = true, targetKeys = false) {
	    if (typeof receive == 'string') {
	      const number = tkVarManager.getVarNumber(receive);
	      receive = `${receive}(${number})`;
	    }
	    this.writeLog(`var[${receive}], push[${push}], target[${targetKeys ? targetKeys.join(',') : "ALL"}]`);
	
	    return true;
	  }
	  output(receive, push = true, targetKeys = false) {
	    const keyCodes = [];
	    keys.forEach((key) => {
	      keyCodes.push((!targetKeys || targetKeys.includes(key)) ? 1 : 0);
	    });
	
	    return [`KeyEntry(${receive}, ${push ? 1 : 0}, 1, ${keyCodes.join(', ')})`];
	  }
	  get JP_NAME() {
	    return 'キー入力の処理';
	  }
	}
	
	module.exports = KeyEntry;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	class Command {
	  constructor() {
	    this.mode = 'exec';
	    this.executeLog = __webpack_require__(8);
	  }
	  execute(...args) {
	    if (this.mode == 'exec') {
	      return this.run.apply(this, args);
	    } else if (this.mode == 'output') {
	      return this.output.apply(this, args);
	    }
	  }
	  get JP_NAME() {
	    return 'TODO';
	  }
	  run() {
	
	  }
	  output() {
	
	  }
	  writeLog(message) {
	    this.executeLog.push(`◆${this.JP_NAME}：${message}`);
	  }
	}
	module.exports = Command;


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	// TODO なんかYamlとかで定義する？
	const Const = {
	  'KEY_DOWN'  : 1,
	  'KEY_LEFT'  : 2,
	  'KEY_RIGHT' : 3,
	  'KEY_UP'    : 4,
	  'KEY_ENTER' : 5,
	  'KEY_CANCEL': 6,
	  'KEY_SHIFT' : 7
	};
	
	module.exports = Const;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const estraverse = __webpack_require__(13);
	
	const optimizeFor = __webpack_require__(14);
	const optimizeConst = __webpack_require__(16);
	const FunctionOptimizer = __webpack_require__(17);
	
	function optimize(ast) {
	  const functionOptimizer = new FunctionOptimizer();
	  // 基本のoptimizeと、functionを退避
	  estraverse.replace(ast, {
	    enter: function (node) {
	      switch (node.type) {
	        case 'ForStatement': {
	          this.skip();
	          return optimizeFor(node);
	        }
	        case 'MemberExpression': {
	          const newNode = optimizeConst(node);
	          if (newNode) {
	            return newNode;
	          }
	          break;
	        }
	      }
	    },
	    leave: function (node) {
	      switch (node.type) {
	        case 'FunctionDeclaration': {
	          const name = node.id.name;
	          functionOptimizer.addFunction(name, node);
	          return null;
	        }
	        case 'Program': {
	          // nullのnodeを削除する
	          node.body = node.body.filter((v) => { return v; });
	          break;
	        }
	      }
	    }
	  });
	  estraverse.replace(ast, {
	    enter: function (node) {
	      switch (node.type) {
	        case 'ExpressionStatement': {
	          if (node.expression.type === 'CallExpression') {
	            const exp = node.expression;
	            const funcNode = functionOptimizer.getNode(exp.callee.name, exp.arguments);
	            if (funcNode) {
	              return funcNode;
	            }
	          }
	          break;
	        }
	      }
	    }
	  });
	
	  return ast;
	}
	
	module.exports = optimize;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(3);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const esprima = __webpack_require__(5);
	const escodegen = __webpack_require__(15);
	const estraverse = __webpack_require__(13);
	
	function optimizeFor(node) {
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
	        // TODO String
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
	
	module.exports = optimizeFor;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(2);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const escodegen = __webpack_require__(15);
	
	function optimizeConst(node, Const) {
	  const code = escodegen.generate(node);
	  if (code.startsWith('tkMock.Const') && Object.keys(Const).includes(node.property.name)) {
	    return {"type": "Literal", "value": Const[node.property.name]};
	  }
	  return node;
	}
	
	module.exports = optimizeConst;
	
	/*
	
	*/


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	const esprima = __webpack_require__(5);
	const estraverse = __webpack_require__(13);
	const escodegen = __webpack_require__(15);
	
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


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const estraverse = __webpack_require__(13);
	
	const tmpVarFactory = __webpack_require__(19);
	
	const parseAssign = __webpack_require__(20);
	const parseBinary = __webpack_require__(22);
	const parseIf = __webpack_require__(23);
	const parseWhile = __webpack_require__(25);
	const parseCall = __webpack_require__(26);
	
	class Parser {
	  constructor(tkMock) {
	    this.outputs = [];
	    if (tkMock) {
	      tkMock.setOutputMode();
	    }
	    this.tkMock = tkMock;
	  }
	
	  appendOutput(args) {
	    if (Array.isArray(args)) {
	      this.outputs = this.outputs.concat(args);
	    } else {
	      this.outputs.push(args);
	    }
	  }
	
	  reset() {
	    this.outputs.length = 0;
	  }
	
	  parseAst(ast, isTmp = false) {
	      const that = this;
	      // TODO functionのパース
	      estraverse.replace(ast, {
	        enter: function (node) {
	          switch (node.type) {
	            case 'IfStatement': {
	              parseIf(node, that);
	              this.skip();
	              break;
	            }
	            case 'WhileStatement': {
	              parseWhile(node, that);
	              this.skip();
	              break;
	            }
	            case 'CallExpression': {
	              parseCall(node, that);
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
	              parseAssign(node, that);
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
	
	
	module.exports = Parser;


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	const TMP_ARR_NAME = 'TMP';
	
	class TmpVarFactory {
	  constructor() {
	    this.tmpIndex = 0;
	  }
	  make() {
	    const name = `${TMP_ARR_NAME}[${this.tmpIndex}]`;
	    this.tmpIndex++;
	
	    return name;
	  }
	  reset() {
	    this.tmpIndex = 0;
	  }
	
	  get TMP_ARR_NAME() {
	    return TMP_ARR_NAME;
	  }
	}
	
	module.exports = new TmpVarFactory();


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const parseVar = __webpack_require__(21);
	
	function parseAssign(node, parser) {
	  const left = parseVar(node.left);
	  const right = node.right;
	  const opeNumber = Operators[node.operator.substr(0, 1)];
	  switch (right.type) {
	    case 'Literal': {
	      if(typeof right.value === 'boolean') {
	        parser.outputs.push(`Switch(0, ${left}, ${left}, ${right.value ? 0 : 1})`);
	      } else {
	        parser.outputs.push(`Variable(0, ${left}, ${left}, ${opeNumber}, 0, ${right.value}, 0)`);
	      }
	      break;
	    }
	    case 'MemberExpression':
	    case 'Identifier': {
	      const rightNumber = parseVar(right);
	      parser.outputs.push(`Variable(0, ${left}, ${left}, ${opeNumber}, 1, ${rightNumber}, 0)`);
	      break;
	    }
	    default: {
	      throw Error(`parseAssignにて未対応の右辺: ${JSON.stringify(node.right)}`);
	    }
	  }
	}
	
	const Operators = {
	  '=' : 0,
	  '+' : 1,
	  '-' : 2,
	  '*' : 3,
	  '/' : 4,
	  '%' : 5
	};
	
	module.exports = parseAssign;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const tkVarManager = __webpack_require__(6);
	const tmpVarFactory = __webpack_require__(19);
	
	function parseVar(node) {
	  switch (node.type) {
	    case 'Identifier': {
	      const varNumber = tkVarManager.getVarNumber(node.name);
	      return varNumber;
	    }
	    case 'MemberExpression': {
	      if (node.object.name !== tmpVarFactory.TMP_ARR_NAME) {
	        throw Error(`parseVar オブジェクト変数は未対応です: ${JSON.stringify(node.object)}`);
	      }
	      if (node.property.type !== 'Literal') {
	        throw Error(`parseVar 不正なプロパティです: ${JSON.stringify(node.property)}`);
	      }
	      const varNumber = tkVarManager.getTmpVarNumber(node.property.value);
	      return varNumber;
	    }
	    default: {
	      throw Error(`parseVar 未定義のtype呼び出し: ${JSON.stringify(node)}`);
	    }
	  }
	}
	
	module.exports = parseVar;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const esprima = __webpack_require__(5);
	const escodegen = __webpack_require__(15);
	
	const tmpVarFactory = __webpack_require__(19);
	
	function parseBinary(node, parser) {
	  let {
	    operator,
	    left,
	    right
	  } = node;
	  if (!Object.keys(BinaryOperators).includes(operator)) {
	    return {
	      operator,
	      left,
	      right
	    };
	  }
	  if (left.type === 'Literal' && right.type === 'Literal') {
	    // 両方リテラルの場合、事前計算する（最適化）
	    return optLiteralBinary(operator, left, right);
	  }
	
	  const leftCode = escodegen.generate(left);
	  const rightCode = escodegen.generate(right);
	
	  const tmpName = tmpVarFactory.make();
	  parser.parseAst(esprima.parse(`${tmpName} = ${leftCode}; ${tmpName} ${operator}= ${rightCode}`), true);
	
	  return esprima.parse(`${tmpName}`).body[0].expression;
	}
	
	function optLiteralBinary(operator, left, right) {
	  let value, type;
	  type = 'Literal';
	  switch (operator) {
	    case '+':
	      {
	        value = left.value + right.value;
	        break;
	      }
	    case '-':
	      {
	        value = left.value - right.value;
	        break;
	      }
	    case '*':
	      {
	        value = left.value * right.value;
	        break;
	      }
	    case '/':
	      {
	        value = left.value / right.value;
	        value = Math.floor(value);
	        break;
	      }
	    case '%':
	      {
	        value = left.value % right.value;
	        break;
	      }
	  }
	
	  return {
	    value,
	    type
	  };
	}
	
	const BinaryOperators = {
	  '=' : 0,
	  '+' : 1,
	  '-' : 2,
	  '*' : 3,
	  '/' : 4,
	  '%' : 5
	};
	
	module.exports = parseBinary;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const parseTest = __webpack_require__(24);
	
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


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const parseVar = __webpack_require__(21);
	
	function parseTest(node, outputs) {
	  // test句のパース
	  switch (node.type) {
	    case 'BinaryExpression': {
	      const varType = node.right.type === 'Literal' ? 0 : 1;
	      const right = node.right.type === 'Literal' ? node.right.value : parseVar(node.right);
	      outputs.push(`If(01, ${parseVar(node.left)}, ${varType}, ${right}, ${TestOperators[node.operator]}, 0)`);
	      break;
	    }
	    case 'Identifier': {
	      outputs.push(`If(00, ${parseVar(node)}, 0, 0, 0, 0)`);
	      break;
	    }
	    case 'UnaryExpression': {
	      outputs.push(`If(00, ${parseVar(node.argument)}, 1, 0, 0, 0)`);
	      break;
	    }
	    case 'Literal': {
	      return false;
	    }
	    default: {
	      throw Error(`未対応のノードタイプです。: ${JSON.stringify(node)}`);
	    }
	  }
	
	  return true;
	}
	
	const TestOperators = {
	  '==' : 0,
	  '>=' : 1,
	  '<=' : 2,
	  '>'  : 3,
	  '<'  : 4,
	  '!=' : 5
	};
	
	module.exports = parseTest;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	const parseTest = __webpack_require__(24);
	
	function parseWhile(node, parser) {
	  parser.outputs.push(`Loop`);
	  if (parseTest(node.test, parser.outputs)) {
	    // test句が有効な場合のみ、break文を自動で挟む
	    parser.outputs.push(`Break`);
	    parser.outputs.push(`EndIf`);
	  }
	  parser.parseAst(node.body);
	  parser.outputs.push(`EndLoop`);
	}
	
	module.exports = parseWhile;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	const escodegen = __webpack_require__(15);
	
	function parseCall(node, parser) {
	  const tkMock = parser.tkMock;
	  const callee = node.callee;
	  if (callee.type === 'MemberExpression' && callee.object.name === tkMock.name) {
	    const code = escodegen.generate(node);
	    eval(`parser.appendOutput(ret = ${code})`); // TODO eval......
	  } else {
	    // TODO function parser
	  }
	}
	
	module.exports = parseCall;
	
	// 古いコード
	/*
	const funcName = callee.property.name;
	const args = [];
	node.arguments.forEach((argNode) => {
	  switch (argNode.type) {
	    case 'Literal': {
	      args.push(argNode.value);
	      break;
	    }
	    case 'ArrayExpression': {
	      // TODO 深い階層のパース。必要？
	      const tmp = [];
	      argNode.elements.forEach((aryNode) => {
	        tmp.push(aryNode.value);
	      });
	      args.push(tmp);
	      break;
	    }
	    default:
	      throw Error(`未対応のargments.type: ${argNode.type}`);
	  }
	});
	const ret = tkMock[funcName](args);
	parser.appendOutput(ret);
	*/


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(23);

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map