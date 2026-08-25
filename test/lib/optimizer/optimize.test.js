import assert from 'power-assert';
import optimize from '../../../js/lib/optimizer/optimize.js';
import esprima from 'esprima';
import escodegen from 'escodegen';


const escodegenOption = {
  format: {
    newline: '',
    indent: {
      style: ''
    }
  }
};

describe('Optimizer optimize', () => {
  it('for文', () => {
    const code = `for (let i = 0; i < 3; i++) {test = 1}`;
    const ast = esprima.parse(code);
    const ret = optimize(ast);

    assert(escodegen.generate(ret, escodegenOption) == `{test = 1;test = 1;test = 1;}`);
  });
  describe('Function系', () => {
    it('引数無し', () => {
      const code = `sub();
function sub() {
  test = 123;
  test2 = 456;
}`;
    const ast = esprima.parse(code);
    const ret = optimize(ast);

    assert(escodegen.generate(ret, escodegenOption) == `{test = 123;test2 = 456;}`);
    });
    it('引数あり', () => {
      const code = `sub(42);
function sub(number) {
  test = number;
}`;
const ast = esprima.parse(code);
const ret = optimize(ast);

assert(escodegen.generate(ret, escodegenOption) == `{test = 42;}`);
    });
  });
  describe('トップレベルconst変数のインライン化', () => {
    it('三項演算子の条件に使われたconstを値に置換し、宣言文は削除する', () => {
      const code = `const flag = true;
test = flag ? 5 : 1;`;
      const ast = esprima.parse(code);
      const ret = optimize(ast);

      assert(escodegen.generate(ret, escodegenOption) == `test = true ? 5 : 1;`);
    });
    it('論理演算子(||)の左辺に使われたconstを値に置換する', () => {
      const code = `const x = 0;
test = x || 99;`;
      const ast = esprima.parse(code);
      const ret = optimize(ast);

      assert(escodegen.generate(ret, escodegenOption) == `test = 0 || 99;`);
    });
    it('他のトップレベルconstを参照するconstも解決できる', () => {
      const code = `const a = 1;
const b = a + 1;
test = b;`;
      const ast = esprima.parse(code);
      const ret = optimize(ast);

      assert(escodegen.generate(ret, escodegenOption) == `test = 2;`);
    });
    it('constと同名のプロパティ名は誤って置換しない', () => {
      const code = `const comment = 'dummy';
test.comment(comment);`;
      const ast = esprima.parse(code);
      const ret = optimize(ast);

      assert(escodegen.generate(ret, escodegenOption) == `test.comment('dummy');`);
    });
    it('for文の上限に使われたconstを値に置換してからループ展開する', () => {
      const code = `const MAX = 3;
for (let i = 0; i < MAX; i++) {
  test = i;
}`;
      const ast = esprima.parse(code);
      const ret = optimize(ast);

      assert(escodegen.generate(ret, escodegenOption) == `{test = 0;test = 1;test = 2;}`);
    });
    it('shorthandのオブジェクトプロパティに使われたconstも値に置換する', () => {
      const code = `const x = 1;
test = { x };`;
      const ast = esprima.parse(code);
      const ret = optimize(ast);

      assert(escodegen.generate(ret, escodegenOption) == `test = { x: 1 };`);
    });
    it('ブロック内でconstが再宣言(シャドーイング)されている場合は畳み込まない', () => {
      const code = `const MAX = 10;
if (cond) {
  const MAX = 5;
  test = MAX;
}`;
      const ast = esprima.parse(code);
      const ret = optimize(ast);

      assert(escodegen.generate(ret, escodegenOption) == `const MAX = 10;if (cond) {const MAX = 5;test = MAX;}`);
    });
    it('関数のパラメータと同名のconstは畳み込まず、パラメータ側が優先される', () => {
      // number という名前が関数のパラメータでシャドーイングされているため、
      // トップレベルのconst宣言自体は安全側に倒してそのまま残す（畳み込まない）
      const code = `const number = 1;
sub(42);
function sub(number) {
  test = number;
}`;
      const ast = esprima.parse(code);
      const ret = optimize(ast);

      assert(escodegen.generate(ret, escodegenOption) == `const number = 1;{test = 42;}`);
    });
    it('コンパイル時に評価できない初期値を持つconstは宣言を残す', () => {
      const code = `const x = someFunc();
test = 1;`;
      const ast = esprima.parse(code);
      const ret = optimize(ast);

      assert(escodegen.generate(ret, escodegenOption) == `const x = someFunc();test = 1;`);
    });
  });
});
