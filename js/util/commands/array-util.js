'use strict';

const Command = require('../command');
/**
 * パーサが変数の添え字に対応していないので、補助関数
 * TODO そのうちパーサ側で対応する
 */
class ArrayUtil extends Command {

  run(base, baseIndex, value, valueIndex) {
    this.writeLog(`base: ${base}[${baseIndex}], value: ${value}[${valueIndex}]`);

    return true;
  }

  output(base, baseIndex, value, valueIndex) {
    const ret = [];
    base = this.parseVar(base);
    value = this.parseVar(value);
    let targetType, valueType;
    if (typeof baseIndex == 'string') {
      // 添え字が変数のパターン
      const tmpBaseIndex = this.getTmpVarNumber(0);
      // 配列の変数番号と添え字変数の値を合算してtmpに入れる
      ret.push(`Variable(0, ${tmpBaseIndex}, ${tmpBaseIndex}, 0, 1, ${this.parseVar(baseIndex)}, 0)`);
      ret.push(`Variable(0, ${tmpBaseIndex}, ${tmpBaseIndex}, 1, 0, ${base}, 0)`);
      base = tmpBaseIndex;
      targetType = 2;
    } else {
      // 添え字がリテラルのパターン
      base += baseIndex;
      targetType = 0;
    }

    // TODO 共通化
    if (typeof valueIndex == 'string') {
      // 添え字が変数のパターン
      const tmpValueIndex = this.getTmpVarNumber(1);
      // 配列の変数番号と添え字変数の値を合算してtmpに入れる
      ret.push(`Variable(0, ${tmpValueIndex}, ${tmpValueIndex}, 0, 1, ${this.parseVar(valueIndex)}, 0)`);
      ret.push(`Variable(0, ${tmpValueIndex}, ${tmpValueIndex}, 1, 0, ${value}, 0)`);
      value = tmpValueIndex;
      valueType = 2;
    } else {
      // 添え字がリテラルのパターン
      value += valueIndex;
      valueType = 0;
    }

    ret.push(`Variable(${targetType}, ${base}, ${targetType == 2 ? 0 : base}, 0, ${valueType}, ${value}, 0)`);

    return ret;
  }

  get JP_NAME() {
    return '変数の操作(配列代入)';
  }

}

module.exports = ArrayUtil;
