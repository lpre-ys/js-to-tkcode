# Usage

## 目次

- [設定ファイル](#設定ファイル)
- [プロジェクト設定 YAML](#プロジェクト設定-yaml)
- [スクリプトローカル定数](#スクリプトローカル定数)
- [対応 JavaScript 構文](#対応-javascript-構文)
- [コマンドリファレンス](#コマンドリファレンス)
- [定数リファレンス](#定数リファレンス)
- [SQL定数（tkMock.Sql）](#sql定数tkmocksql)
- [ライブラリとしての利用](#ライブラリとしての利用)

---

## 設定ファイル

`js2tk.config.js` は Node.js モジュール形式で記述する。

```js
module.exports = {
  // 必須
  scripts: './js-scripts',           // JSソースコードのディレクトリ
  build:   './tkcode-output',        // TKcodeファイルの出力先
  pjConfig: './project-config.yaml', // 変数・スイッチ定義YAMLのパス
  tmpFile:  './.tmp/build-time',     // 内部使用テンポラリファイル
  hashFile: './.tmp/hash-list.json', // インクリメンタルビルド用ハッシュリスト

  // オプション
  lib:      './js-lib',              // 共有ライブラリディレクトリ（importで使用）
  exclude:  'node_modules',          // スキップするパターン（単一）
  excludes: ['test', 'sample'],      // スキップするパターン（複数）
  database: './project.db',          // SQL最適化用 SQLite3 データベース
};
```

### CLI オプション

```bash
js2tk --config js2tk.config.js
```

| オプション | デフォルト | 説明 |
|---|---|---|
| `--config` | `js2tk.config.js` | 設定ファイルのパス |

ビルド完了後、ファイル変更の監視が始まり、変更があれば自動再ビルドする。

---

## プロジェクト設定 YAML

変数・スイッチの名前とツクール内部 ID のマッピングを定義する。

```yaml
# project-config.yaml

varList:
  playerHp: 1        # 変数名: 内部ID
  playerMp: 2
  gold: 10

switchList:
  isBattleActive: 100   # スイッチ名: 内部ID
  isEventDone: 101

tmpStart: 200          # 一時変数の開始ID（式評価に使用）
tmpEnd: 299            # 一時変数の終了ID

pjConst:               # プロジェクト全体の定数（スクリプト内で直接使用可能）
  MAX_PARTY: 4
  BOSS_HP: 5000
```

---

## スクリプトローカル定数

スクリプトと同名の `.yaml` ファイルを置くと、そのスクリプト専用の定数を定義できる。

```
js-scripts/
  event1.js
  event1.yaml    ← event1.js 専用の定数
```

```yaml
# event1.yaml
varList:
  localVar: 50   # event1.js でのみ使える変数

pjConst:
  TRIGGER_ID: 3
```

---

## 対応 JavaScript 構文

### 変数代入

```js
// 単純代入
playerHp = 100;

// 複合代入
playerHp += 10;
playerHp -= 5;
playerHp *= 2;
playerHp /= 4;
playerHp %= 3;

// 変数同士の演算
gold = gold + bonus;
```

### 条件分岐

```js
if (playerHp < 10) {
  tkMock.message('HPが少ない！');
} else if (playerHp < 50) {
  tkMock.message('HPが減っている');
} else {
  tkMock.message('HPは十分ある');
}
```

### ループ

```js
// while ループ
var i = 0;
while (i < 5) {
  tkMock.wait(10);
  i += 1;
}

// break
while (true) {
  if (playerHp <= 0) {
    break;
  }
  tkMock.wait(1);
}
```

### 定数の使用

`pjConst` や `Const` の値はコンパイル時に展開される。

```js
// BOSS_HP は pjConst で 5000 と定義済み
if (enemyHp < BOSS_HP) {
  tkMock.message('ボスを倒した！');
}

// ビルトイン定数（Const）
tkMock.weather(Const.WEATHER_RAIN, 5);
tkMock.keyEntry(keyResult, false, [Const.KEY_ENTER]);
```

### 非対応

以下の構文には対応していない：

- クラス定義 (`class`)
- `async` / `await`
- ジェネレータ (`function*`)
- `try` / `catch`
- オブジェクトリテラル (`{ key: value }`)

---

## コマンドリファレンス

スクリプト内では `tkMock.コマンド名(引数)` の形式で TKcode コマンドを呼び出す。

### メッセージ・入力

| コマンド | 説明 |
|---|---|
| `message(text)` | 文章を表示する |
| `message(lines)` | 複数行を配列で表示する（`lines` は文字列の配列）|
| `message(text, isFlash)` | `isFlash: true` でフラッシュ付き表示 |
| `choice(receiveVar, label, choices, cancelKey?, isFlash?)` | 選択肢を表示し、選択結果を変数に格納する |
| `keyEntry(receiveVar, isPush, targetKeys)` | キー入力を取得する。`targetKeys` はキー名の配列 |
| `inputNumber(receiveVar, digits)` | 数値入力ダイアログを表示する |
| `setString(stringVar, text)` | 文字列変数に値をセットする |
| `clearString(stringVar)` | 文字列変数をクリアする |
| `resetFace()` | 顔グラフィックをリセットする |
| `messageOption(...)` | メッセージの表示オプションを設定する |

```js
// 例
tkMock.message('勇者よ、旅立ちの時だ。');
tkMock.message(['一行目', '二行目', '三行目']);
tkMock.choice(result, '行動を選べ', ['攻撃', '防御', '逃げる']);
tkMock.keyEntry(keyResult, false, ['enter', 'cancel']);
```

### 画面制御

| コマンド | 説明 |
|---|---|
| `showScreen()` | 画面を表示する |
| `hideScreen()` | 画面を非表示にする |
| `setTransition(type, duration)` | トランジション方法を設定する |
| `changeBg(file)` | 背景画像を変更する |
| `changeTone(r, g, b, gray, duration)` | 画面のトーンを変更する |
| `weather(type, intensity)` | 天候を設定する |
| `flash(r, g, b, alpha, duration)` | 画面全体をフラッシュさせる |
| `eventFlash(eventId, r?, g?, b?, alpha?, duration?)` | 特定イベントをフラッシュさせる |

```js
tkMock.hideScreen();
tkMock.changeTone(255, -128, 0, 0, 60); // 赤みがかった色調に変更
tkMock.showScreen();
tkMock.weather(Const.WEATHER_SNOW, 3);
```

### ピクチャー

| コマンド | 説明 |
|---|---|
| `showPicture(file, num, x, y, alpha?, transparent?, r?, g?, b?)` | ピクチャーを表示する |
| `showStickyPicture(file, num, x?, y?, ...)` | 固定ピクチャーを表示する |
| `movePicture(num, duration, x, y, alpha?, r?, g?, b?)` | ピクチャーを移動する |
| `deletePicture(num)` | ピクチャーを削除する |

### サウンド

| コマンド | 説明 |
|---|---|
| `playBgm(file, time, volume, tempo, balance)` | BGM を再生する |
| `stopBgm(duration)` | BGM を停止する |
| `fadeoutBgm(duration)` | BGM をフェードアウトする |
| `loadBgm(file)` | BGM をメモリに読み込む |
| `saveBgm()` | 現在の BGM を保存する |
| `playSound(file, volume, tempo, balance)` | SE を再生する |

```js
tkMock.playBgm('battle.mid', 0, 100, 100, 50);
tkMock.playSound('attack.wav', 80, 100, 50);
tkMock.fadeoutBgm(120);
```

### イベント制御

| コマンド | 説明 |
|---|---|
| `exitEvent()` | イベント処理を終了する |
| `callEvent(commonEventId)` | コモンイベントを呼び出す |
| `callMapEvent(mapId, eventId)` | マップイベントを呼び出す |
| `wait(ticks)` | 指定フレーム数待機する |
| `getTick()` | 現在のフレーム数を取得する |
| `label(labelId)` | ラベルを設置する |
| `goto(labelId)` | 指定ラベルへジャンプする |

### パーティー・場所移動

| コマンド | 説明 |
|---|---|
| `addMember(memberId)` | パーティーにメンバーを追加する |
| `removeMember(memberId)` | パーティーからメンバーを削除する |
| `movePlace(mapId, x, y)` | 指定マップ・座標に移動する（値指定）|
| `movePlace(varMapId, varX, varY)` | 指定マップ・座標に移動する（変数指定）|
| `storePlace(mapId, x, y)` | 現在位置を保存する |

### キャラクター・アクション

| コマンド | 説明 |
|---|---|
| `getCharaInfo(receiveVar, eventId, infoType)` | キャラクター情報を取得する |
| `moveEvent(eventId, direction)` | イベントを移動させる |
| `action(eventId, actions)` | イベントに複合アクションを設定する |
| `startAction(eventId, actionType)` | イベントにアクションを開始させる |
| `execAllAction()` | 設定済みの全アクションを実行する |
| `cancelAllAction()` | 設定済みの全アクションをキャンセルする |
| `actionSwitch(eventId, onId, offId)` | アクションのスイッチを設定する |
| `actionSound(eventId, sound)` | アクションの SE を設定する |
| `actionGraphic(eventId, file, ...)` | アクションのグラフィックを設定する |
| `effect(eventId, effectId)` | エフェクトを再生する |
| `showPc()` | プレイヤーキャラを表示する |
| `hidePc()` | プレイヤーキャラを非表示にする |
| `lockCamera()` | カメラをロックする |
| `releaseCamera()` | カメラのロックを解除する |

### 変数・スイッチ

| コマンド | 説明 |
|---|---|
| `rangeAssign(startVar, endVar, value)` | 変数の範囲に同じ値を一括代入する |
| `rangeBoolean(startSwitch, endSwitch, value)` | スイッチの範囲に同じ値を一括設定する |
| `rand(receiveVar, min, max)` | 乱数を生成して変数に格納する |

### データベース

| コマンド | 説明 |
|---|---|
| `setDbRow(dbId, rowId, colName, value)` | DB の行にデータをセットする |

### データ構造（Stack / Queue）

スタック・キューはそれぞれ変数名で管理する。

```js
// Stack
tkMock.stackInit('myStack');
tkMock.stackPush('myStack', 42);
tkMock.stackPop('myStack', result);

// Queue
tkMock.queueInit('myQueue');
tkMock.queueEnqueue('myQueue', 10);
tkMock.queueDequeue('myQueue', result);
tkMock.queueIsEmpty('myQueue', isEmptyFlag);
tkMock.queueRevert('myQueue');
```

### その他

| コマンド | 説明 |
|---|---|
| `import(scriptPath)` | 外部スクリプトを展開する（`lib` ディレクトリ基準）|
| `raw(tkcodeString)` | TKcode をそのまま出力する。未対応のコマンドはこちらで対応してください |
| `comment(text)` | コメントを出力する |

---

## 定数リファレンス

`Const.XXX` の形式でスクリプト内から参照できる。完全な定義は [`js/util/const.js`](./js/util/const.js) を参照。

### キーコード

| 定数 | 値 | 説明 |
|---|---|---|
| `Const.KEY_NONE` | 0 | なし |
| `Const.KEY_DOWN` | 1 | 下キー |
| `Const.KEY_LEFT` | 2 | 左キー |
| `Const.KEY_RIGHT` | 3 | 右キー |
| `Const.KEY_UP` | 4 | 上キー |
| `Const.KEY_ENTER` | 5 | 決定キー |
| `Const.KEY_CANCEL` | 6 | キャンセルキー |
| `Const.KEY_SHIFT` | 7 | シフトキー |

### イベントターゲット

| 定数 | 値 | 説明 |
|---|---|---|
| `Const.EVENT_HERO` | 10001 | 主人公 |
| `Const.EVENT_THIS` | 10005 | このイベント自身 |

### アクションタイプ

| 定数 | 値 | 説明 |
|---|---|---|
| `Const.ACT_GO_UP` | 0 | 上に移動 |
| `Const.ACT_GO_RIGHT` | 1 | 右に移動 |
| `Const.ACT_GO_DOWN` | 2 | 下に移動 |
| `Const.ACT_GO_LEFT` | 3 | 左に移動 |
| `Const.ACT_GO_RIGHTUP` | 4 | 右上に移動 |
| `Const.ACT_GO_RIGHTDOWN` | 5 | 右下に移動 |
| `Const.ACT_GO_LEFTDOWN` | 6 | 左下に移動 |
| `Const.ACT_GO_LEFTUP` | 7 | 左上に移動 |
| `Const.ACT_MOVE_STEP` | 11 | 1歩移動 |
| `Const.ACT_UP` | 12 | 上向き移動 |
| `Const.ACT_RIGHT` | 13 | 右向き移動 |
| `Const.ACT_DOWN` | 14 | 下向き移動 |
| `Const.ACT_LEFT` | 15 | 左向き移動 |
| `Const.ACT_TURN_RIGHT` | 16 | 右を向く |
| `Const.ACT_TURN_LEFT` | 17 | 左を向く |
| `Const.ACT_TURN_HERO` | 21 | 主人公の方を向く |
| `Const.ACT_TURN_BACK_HERO` | 22 | 主人公の逆を向く |
| `Const.ACT_STOP` | 23 | 停止 |
| `Const.ACT_JUMP_START` | 24 | ジャンプ開始 |
| `Const.ACT_JUMP_END` | 25 | ジャンプ終了 |
| `Const.ACT_TURN_OFF` | 26 | 向き固定ON |
| `Const.ACT_TURN_ON` | 27 | 向き固定OFF |
| `Const.ACT_SPEED_UP` | 28 | 速度アップ |
| `Const.ACT_SPEED_DOWN` | 29 | 速度ダウン |
| `Const.ACT_FREQ_UP` | 30 | 頻度アップ |
| `Const.ACT_FREQ_DOWN` | 31 | 頻度ダウン |
| `Const.ACT_THROUGH_ON` | 36 | すり抜けON |
| `Const.ACT_THROUGH_OFF` | 37 | すり抜けOFF |
| `Const.ACT_ANIME_STOP` | 38 | アニメ停止 |
| `Const.ACT_ANIME_START` | 39 | アニメ再開 |
| `Const.ACT_TRANSPARENT_UP` | 40 | 透明度アップ |
| `Const.ACT_TRANSPARENT_DOWN` | 41 | 透明度ダウン |

### 画面エフェクト（SCREEN）

| 定数 | 値 | 説明 |
|---|---|---|
| `Const.SCREEN_INHERIT` | '-1' | 引き継ぎ |
| `Const.SCREEN_FADEOUT` | '00' | フェードアウト |
| `Const.SCREEN_RANDOMBLOCK_ALL` | '01' | ランダムブロック（全方向）|
| `Const.SCREEN_RANDOMBLOCK_DOWN` | '02' | ランダムブロック（下）|
| `Const.SCREEN_RANDOMBLOCK_UP` | '02' | ランダムブロック（上）|
| `Const.SCREEN_STRIPE_HORIZONTAL` | '05' | 横ストライプ |
| `Const.SCREEN_STRIPE_VERTICAL` | '06' | 縦ストライプ |
| `Const.SCREEN_TO_INSIDE` | '07' | 内側へ |
| `Const.SCREEN_TO_OUTSIDE` | '08' | 外側へ |
| `Const.SCREEN_NO_WAIT` | '19' | ウェイトなし |

### トランジションタイプ（TRANS）

| 定数 | 値 | 説明 |
|---|---|---|
| `Const.TRANS_MOVE_IN` | '00' | 移動イン |
| `Const.TRANS_MOVE_OUT` | '01' | 移動アウト |
| `Const.TRANS_BATTLE_START_IN` | '02' | 戦闘開始イン |
| `Const.TRANS_BATTLE_START_OUT` | '03' | 戦闘開始アウト |
| `Const.TRANS_BATTLE_END_IN` | '04' | 戦闘終了イン |
| `Const.TRANS_BATTLE_END_OUT` | '05' | 戦闘終了アウト |

### メッセージ位置（MSG_POSITION）

| 定数 | 値 | 説明 |
|---|---|---|
| `Const.MSG_POSITION_TOP` | 0 | 上 |
| `Const.MSG_POSITION_MIDDLE` | 1 | 中央 |
| `Const.MSG_POSITION_BOTTOM` | 2 | 下 |

### 天候（WEATHER）

| 定数 | 値 | 説明 |
|---|---|---|
| `Const.WEATHER_NONE` | 0 | なし |
| `Const.WEATHER_RAIN` | 1 | 雨 |
| `Const.WEATHER_SNOW` | 2 | 雪 |

### キャラクター情報タイプ（CHARA）

| 定数 | 値 | 説明 |
|---|---|---|
| `Const.CHARA_MAP_ID` | 0 | 現在のマップID |
| `Const.CHARA_MAP_X` | 1 | マップ上の X 座標 |
| `Const.CHARA_MAP_Y` | 2 | マップ上の Y 座標 |
| `Const.CHARA_DIRECTION` | 3 | 向き |
| `Const.CHARA_POINT_X` | 4 | ピクセル X 座標 |
| `Const.CHARA_POINT_Y` | 5 | ピクセル Y 座標 |

### キャラクター向き（DIRECTION）

| 定数 | 値 | 説明 |
|---|---|---|
| `Const.DIRECTION_UP` | 8 | 上 |
| `Const.DIRECTION_RIGHT` | 6 | 右 |
| `Const.DIRECTION_DOWN` | 2 | 下 |
| `Const.DIRECTION_LEFT` | 4 | 左 |

---

## SQL定数（tkMock.Sql）

設定ファイルの `database` に SQLite データベースを指定すると、DB のデータをコンパイル時定数として使えるようになる。

### DB のテーブル要件

各テーブルには **`label` カラム**（文字列）が必要。このカラムがキーとして使われる。

```sql
CREATE TABLE enemy (
  label  TEXT,   -- キー（必須）
  id     INTEGER,
  hp     INTEGER,
  atk    INTEGER
);

INSERT INTO enemy VALUES ('slime',  1, 30, 5);
INSERT INTO enemy VALUES ('goblin', 2, 50, 10);
INSERT INTO enemy VALUES ('boss',   3, 5000, 80);
```

### 使い方

```
tkMock.Sql.テーブル名.ラベル名          -- id カラムの値を取得
tkMock.Sql.テーブル名.ラベル名['カラム名'] -- 指定カラムの値を取得
```

```js
// enemy テーブルの 'slime' 行の id カラム → 1 に置換される
movePlace(tkMock.Sql.enemy.slime, 10, 20);

// 'boss' 行の hp カラム → 5000 に置換される
if (enemyHp < tkMock.Sql.enemy.boss['hp']) {
  tkMock.message('ボスのHPが減った！');
}
```

コンパイル時にすべて数値リテラルに展開されるため、実行時のオーバーヘッドはない。

### 設定ファイルへの追記

```js
module.exports = {
  // ...
  database: './project.db',  // SQLite3 データベースのパス
};
```

### エラー

指定したテーブル・ラベル・カラムが DB に存在しない場合、ビルド時にエラーになる：

```
Error: optimizerSql 値が見つかりませんでした: enemy unknown_label id
```

---

## ライブラリとしての利用

Node.js スクリプトや他のツールから直接使用することもできる。

```js
const { JsToTkcode, TkMock } = require('js-to-tkcode');

const translator = new JsToTkcode({
  varList:    { playerHp: 1, gold: 10 },
  switchList: { isBattleActive: 100 },
  tmpStart: 200,
  tmpEnd: 299,
});

// データベースを使う場合（SQL最適化）
await translator.loadDatabase('project.db');

const tkcode = translator.translate(`
  if (playerHp < 10) {
    tkMock.message('HPが少ない！');
  }
`);

console.log(tkcode);
```

### TkMock（テスト・デバッグ用）

```js
const { TkMock } = require('js-to-tkcode');

const mock = new TkMock();
mock.setOutputMode(); // 出力モードに切り替え

const result = mock.message('Hello');
console.log(result); // => TKcode 文字列
```
