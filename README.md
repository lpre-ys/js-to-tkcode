# js-to-tkcode

JavaScript コードを TKcode（RPGツクールシリーズのゲームエンジン用スクリプト言語）に変換するトランスパイラー。

## インストール

```bash
npm install js-to-tkcode
```

グローバルインストール（CLI として使用する場合）：

```bash
npm install -g js-to-tkcode
```

## クイックスタート

### 1. プロジェクト設定ファイルを作成する

```js
// js2tk.config.js
module.exports = {
  scripts: './js-scripts',
  build: './tkcode-output',
  pjConfig: './project-config.yaml',
  tmpFile: './.tmp/build-time',
  hashFile: './.tmp/hash-list.json',
};
```

### 2. 変数・スイッチ定義ファイルを作成する

```yaml
# project-config.yaml
varList:
  playerHp: 1
  playerMp: 2

switchList:
  isBattleActive: 100

tmpStart: 101
tmpEnd: 200
```

### 3. JavaScript でスクリプトを書く

```js
// js-scripts/event1.js
if (playerHp < 10) {
  tkMock.message('HPが少ない！');
  tkMock.playSound('warning.wav', 100, 100, 50);
}
tkMock.exitEvent();
```

### 4. ビルドする

```bash
js2tk --config js2tk.config.js
```

`tkcode-output/event1.tkcode` が生成され、ファイル変更を監視する自動ビルドが始まる。

## ドキュメント

詳細な使い方・コマンド一覧は [Usage.md](./Usage.md) を参照。

## ライセンス

MIT
