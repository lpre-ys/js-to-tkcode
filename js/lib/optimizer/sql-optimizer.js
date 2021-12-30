'use strict';

const estraverse = require('estraverse');
const escodegen = require('escodegen');
const sqlite3 = require('sqlite3').verbose();

class SqlOptimizer {
  constructor(database) {
    this.database = database;
    this.data = {};
  }
  load() {
    return new Promise((resolve) => {
      this.db = new sqlite3.Database(this.database);
      resolve(true);
    }).then(() => {
      return new Promise((resolve, reject) => {
        // テーブル一覧の取得
        const tables = [];
        this.db.all(`SELECT name FROM sqlite_master WHERE type = 'table'`, (err, rows) => {
          if (err) {
            reject(err);
          }
          rows.forEach((row) => {
            tables.push(row.name);
          });
          resolve(tables);
        });
      });
    }).then((tables) => {
      const promises = [];
      tables.forEach((table) => {
        this.data[table] = {};
        promises.push(new Promise((resolve, reject) => {
          this.db.all(`SELECT * FROM ${table}`, (err, rows) => {
            if (err) {
              reject(err);
            }
            rows.forEach((row) => {
              this.data[table][row.label] = row;
            });
            resolve(true);
          });
        }));
      });

      return Promise.all(promises);
    }).then(() => {
      return new Promise((resolve) => {
        this.db.close();
        resolve(true);
      });
    });
  }
  optimize(ast) {
    const data = this.data;
    estraverse.replace(ast, {
      enter: function (node) {
        if (node.type == 'MemberExpression') {
          const newNode = replaceNode(node, data);
          if (newNode) {
            return newNode;
          }
        }
      },

    });
    return ast;
  }
}

function replaceNode(node, data) {
  const code = escodegen.generate(node);
  if (code.startsWith('tkMock.Sql')) {
    // tableまで指定があるかチェック
    const tokens = code.split('.');
    if (tokens.length != 4) {
      return false;
    }
    // テーブル名, key, カラム名を取得
    const table = tokens[2];
    let key, column = 'id';
    if (node.computed == true) {
      column = node.property.value;
      key = node.object.property.name;
    } else {
      key = node.property.name;
    }

    // 値が見つからなかった場合、エラーにする
    if (typeof data[table][key] === 'undefined' || typeof data[table][key][column] === 'undefined') {
      throw Error(`optimizerSql 値が見つかりませんでした: ${table} ${key} ${column}`);
    }

    const value = data[table][key][column];
    if (value < 0) {
      return {
        "type": "UnaryExpression",
        "operator": "-",
        "argument": {
            "type": "Literal",
            "value": value * -1,
        },
        "prefix": true
      };
    } else {
      return {"type": "Literal", "value": value};
    }
  }
}

module.exports = SqlOptimizer;
