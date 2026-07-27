import assert from 'power-assert';
import { spawnSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const mainPath = fileURLToPath(new URL('../../js/bin/main.js', import.meta.url));

// import の解決失敗を示すエラー。依存が ESM 専用化したり default export を
// 廃止したりすると、CLI はモジュール読み込みの時点で起動できなくなる。
const IMPORT_ERROR =
  /does not provide an export named|ERR_MODULE_NOT_FOUND|ERR_REQUIRE_ESM|Cannot find package/;

describe('js2tk CLI の起動スモーク', () => {
  it('全ての import が解決でき、設定ファイルの読み込みまで到達すること', function () {
    this.timeout(20000);

    // 設定ファイルが存在しない一時ディレクトリで起動する。import が全て解決
    // できていれば js2tk.config.js を探しに行き、そこで初めて失敗する。
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'js2tk-smoke-'));
    const result = spawnSync(process.execPath, [mainPath], {
      cwd,
      encoding: 'utf8',
      timeout: 15000,
    });
    const output = `${result.stdout}${result.stderr}`;

    assert(
      !IMPORT_ERROR.test(output),
      `import の解決に失敗している:\n${output.slice(0, 800)}`
    );
    // 設定ファイル探索まで到達した＝全ての import が解決できている
    assert(/Cannot find module .*js2tk\.config\.js/.test(output));
  });
});
