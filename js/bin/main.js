#!/usr/bin/env node

const chokidar = require("chokidar");
const parseArgs = require("minimist");
const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const yaml = require("js-yaml");
const JsToTkcode = require("../lib/js-to-tkcode");

const md5 = require("md5");
const md5File = require("md5-file");

const args = parseArgs(process.argv);
if (!args.config) {
  args.config = "js2tk.config.js";
}
const configPath = path.resolve(args.config);
const config = require(configPath);
const scriptsPath = path.resolve(config.scripts);
const libPath = config.lib ? path.resolve(config.lib) : false;

const red = "\u001b[31m";
// const black   = '\u001b[30m';
const green = "\u001b[32m";
const yellow = "\u001b[33m";
//const blue    = '\u001b[34m';
// const magenta = '\u001b[35m';
const cyan = "\u001b[36m";
// const white   = '\u001b[37m';

const reset = "\u001b[0m";

// init
console.log(`INIT-START`);
let builded = 0;
let writed = 0;
let skipped = 0;
let errorCount = 0;
let isInit = true;
let isDiffSkip = true; // ファイル差分によるスキップを許可する
writeTime(config.tmpFile);

// set timer
const timer = setInterval(initLog, 100);

// loadHashList
const hashList = {};
try {
  Object.assign(hashList, JSON.parse(fs.readFileSync(config.hashFile)));
} catch (err) {
  if (err.code !== "ENOENT") {
    throw err;
  }
}

const scripts = [];
readdirRec(scriptsPath, scripts, /.*\.js$/);
const initTargetCount = scripts.length;

const libs = [];
if (libPath) {
  readdirRec(libPath, libs, /.*\.js$/);
}

const pjConfigFile = fs.readFileSync(path.resolve(config.pjConfig).toString());
const pjConfigMd5 = md5(pjConfigFile);
if (!hashList["pjConfig"] || hashList["pjConfig"] !== pjConfigMd5) {
  isDiffSkip = false;
  hashList["pjConfig"] = pjConfigMd5;
}
const pjConfig = yaml.load(pjConfigFile);
if (config.database) {
  pjConfig["database"] = path.resolve(config.database);
  // hash check
  const dbMd5 = md5File.sync(pjConfig["database"]);
  if (!hashList["database"] || hashList["database"] !== dbMd5) {
    isDiffSkip = false;
    hashList["database"] = dbMd5;
  }
}

const jsToTkcode = new JsToTkcode(pjConfig);
let buildedLib = "";

// load database
jsToTkcode
  .loadDatabase()
  .then(() => {
    // load lib
    return loadLib();
  })
  .then((result) => {
    buildedLib = result;

    // build
    return Promise.all(
      scripts.map((script) => {
        return build(script, buildedLib).then((result) => {
          if (result.type === "skip") {
            skipped += 1;
          }
          if (result.type === "error") {
            errorCount += 1;
          }
        });
      })
    );
  })
  .then((result) => {
    // TODO 結果リスト
    initLog();
    writeHashFile();
    console.log(`INIT-BUILD END`);
    isInit = false;
    clearInterval(timer);
    startWatch();
  });

function initLog() {
  const total = writed + skipped + errorCount;
  console.log(
    `${green}PROGRESS${reset} B: ${builded} W: ${writed} S: ${skipped} E: ${errorCount} total: ${total} / ${initTargetCount}`
  );
}

function build(scriptPath, lib) {
  return new Promise((resolve) => {
    if (scriptPath.indexOf(config.exclude) > -1) {
      resolve({
        type: "skip",
        path: scriptPath.replace(scriptsPath, ""),
      });
      return;
    }
    if (
      config.excludes &&
      config.excludes.findIndex((exclude) => {
        return scriptPath.indexOf(exclude) > -1;
      }) > -1
    ) {
      resolve({
        type: "skip",
        path: scriptPath.replace(scriptsPath, ""),
      });
      return;
    }
    // console.log(`BUILD-INIT: ${scriptPath.replace(scriptsPath, '')}`);
    // ディレクトリが無かったら作っとく
    const tkcodePath = getBuildPath(scriptPath);
    // mkdirp.sync(path.dirname(tkcodePath));
    makeDir(tkcodePath)
      .then(() => {
        // ディレクトリの準備が終わったら、スクリプトとConfigを読み込む
        return Promise.all([
          readScript(scriptPath, lib),
          readAllLocalConst(scriptPath),
        ]);
      })
      .then((results) => {
        // データがそろったらビルド
        const [script, localConst] = results;
        // スキップチェック
        const keyHash = md5(scriptPath);
        const newHash = md5(script + JSON.stringify(localConst));
        const oldHash = hashList[keyHash];
        // ハッシュ上書き
        hashList[keyHash] = newHash;
        if (oldHash && newHash === oldHash) {
          if (isDiffSkip) {
            // スキップ可ならスキップして終わる
            resolve({
              type: "skip",
              path: scriptPath.replace(scriptsPath, ""),
            });
            return { type: "skip" };
          }
        }
        // スクリプト・Constが揃ったら、ビルドを行う
        // console.log(`BUILD-START: ${scriptPath.replace(scriptsPath, '')}`);
        return translatePromises(script, localConst).catch((error) => {
          console.error(
            `${red}!!!BUILD-ERROR!!!${reset}: ${scriptPath.replace(
              scriptsPath,
              ""
            )}`
          );
          console.error(`        ${error.error.message}`);
          // FOR DEBUG
          // console.error(error.error.stack);
          // エラーがあった場合はここで処理を抜ける
          resolve({
            type: "error",
            path: scriptPath.replace(scriptsPath, ""),
          });
        });
      })
      .then((result) => {
        const { type, tkcode } = result;
        if (type === "skip") {
          return false;
        }

        if (isInit) builded += 1;
        if (type === "undefined") {
          console.log(
            `${yellow}[WARNING] find UNDEFINED${reset}: ${scriptPath.replace(
              scriptsPath,
              ""
            )}`
          );
        }

        // ビルドが終わったら、ファイルに書き込む
        return fsPromises.writeFile(tkcodePath, tkcode);
      })
      .then((result) => {
        if (result !== false) {
          if (isInit) writed += 1;
          // console.log(`${green}BUILD-END${reset}: ${scriptPath.replace(scriptsPath, '')}`);
          resolve({
            type: "OK",
            path: scriptPath.replace(scriptsPath, ""),
          });
        }
      })
      .catch((error) => {
        console.error(error);
        console.error(
          `${red}!!!WRITE-ERROR!!!${reset}: ${scriptPath.replace(
            scriptsPath,
            ""
          )}`
        );
        resolve({
          type: "error",
          path: scriptPath.replace(scriptsPath, ""),
        });
      });
  });
}

function translatePromises(script, localConst) {
  return new Promise((resolve, reject) => {
    try {
      const tkcode = jsToTkcode.translate(script, localConst);
      if (tkcode.match(/undefined/)) {
        resolve({
          type: "undefined",
          tkcode: tkcode,
        });
      }
      resolve({
        type: "ok",
        tkcode: tkcode,
      });
    } catch (e) {
      reject({
        type: "build-error",
        error: e,
      });
    }
  });
}

function makeDir(tkcodePath) {
  return mkdirp(path.dirname(tkcodePath));
}

function writeHashFile() {
  fs.writeFileSync(config.hashFile, JSON.stringify(hashList));
}

function readScript(scriptPath, lib) {
  return fsPromises.readFile(scriptPath).then((result) => {
    return result.toString().replace(/.*Math\.floor.*/g, "") + "\n" + lib;
  });
}

function readAllLocalConst(scriptPath) {
  return Promise.all([
    readLocalConst(scriptPath),
    readLocalDirConst(scriptPath),
  ]).then((results) => {
    const ret = {};
    Object.assign(ret, results[0]);
    Object.assign(ret, results[1]);
    return ret;
  });
}

function readLocalDirConst(scriptPath) {
  const localDirConstPath = path.resolve(
    path.dirname(scriptPath) + "/config.yaml"
  );
  return fsPromises
    .readFile(localDirConstPath, "utf8")
    .then((result) => {
      return yaml.load(result);
    })
    .catch((error) => {
      // 読めなかった場合何もしない
      if (error.code !== "ENOENT") {
        console.error(error);
      }
    });
}

function readLocalConst(scriptPath) {
  const localConstPath = scriptPath.replace(".js", ".yaml");
  return fsPromises
    .readFile(localConstPath, "utf8")
    .then((result) => {
      return yaml.load(result);
    })
    .catch((error) => {
      // 読めなかった場合何もしない
      if (error.code !== "ENOENT") {
        console.error(error);
      }
    });
}

function getBuildPath(filepath) {
  const rel = path
    .resolve(filepath)
    .replace(scriptsPath, "")
    .replace(/\.js$/, ".tkcode");
  const buildPath = path.resolve(`${config.build}${rel}`);

  return buildPath;
}

function readdirRec(dir, list, filter = false) {
  fs.readdirSync(dir).forEach((item) => {
    var stat = fs.statSync(path.join(dir, item));
    if (stat.isFile()) {
      if (filter && !filter.test(item)) return;
      list.push(path.resolve(path.join(dir, item)));
    } else if (stat.isDirectory())
      readdirRec(path.join(dir, item), list, filter);
  });
}

function loadLib() {
  return Promise.all(
    libs.map((lib) => {
      return fsPromises.readFile(lib).then((result) => {
        return result.toString().replace(/.*Math\.floor.*/g, "");
      });
    })
  ).then((libTexts) => {
    return libTexts.join("\n");
  });
}

function loadPjConfig() {
  const pjConfig = yaml.load(
    fs.readFileSync(path.resolve(config.pjConfig)).toString()
  );
  jsToTkcode.resetConfig(pjConfig);
}

// script watch
function startWatch() {
  // watch時は、DIFFによるスキップは行わない
  isDiffSkip = false;
  const scriptWatcher = chokidar.watch(scriptsPath, {
    ignored: "**/*.yaml",
    persistent: true,
  });

  scriptWatcher.on("ready", () => {
    console.log(`SCRIPT WATCH START`);
    scriptWatcher.on("add", (filepath) => {
      console.log(`SCRIPT ADD: ${filepath}`);
      build(filepath, buildedLib).then((result) => {
        const { type, path } = result;
        watchBuildLog(type, path);
        writeHashFile();
      });
    });
    scriptWatcher.on("change", (filepath) => {
      console.log(`SCRIPT CHANGE: ${filepath}`);
      build(filepath, buildedLib).then((result) => {
        const { type, path } = result;
        watchBuildLog(type, path);
        writeHashFile();
      });
    });
  });

  // lib watch
  if (libPath) {
    const libWatcher = chokidar.watch(libPath, {
      ignored: /[\/\\]\./,
      persistent: true,
    });

    libWatcher.on("ready", () => {
      // 負荷ヤバかったら、loadLibの方式変える
      console.log(`LIB WATCH START`);
      libWatcher.on("add", (filepath) => {
        console.log(`LIB ADD: ${filepath}`);
        loadLib().then((result) => {
          buildedLib = result;
        });
      });
      libWatcher.on("change", (filepath) => {
        console.log(`LIB CHANGE: ${filepath}`);
        loadLib().then((result) => {
          buildedLib = result;
        });
      });
    });
  }

  // config watch

  const configWatch = chokidar.watch(config.pjConfig);
  configWatch.on("ready", () => {
    console.log(`PJ-CONFIG WATCH START`);
    configWatch.on("change", (filepath) => {
      console.log(`PJ-CONFIG CHANGE: ${filepath}`);
      loadPjConfig();
    });
  });
}

function watchBuildLog(type, path) {
  if (type === "OK") {
    console.log(`${green}BUILD-END${reset}: ${path}`);
  }
  if (type === "skip") {
    console.log(`${green}SKIP${reset}: ${path}`);
  }
  if (type === "error") {
    console.error(`${red}!!!BUILD-ERROR!!!${reset}: ${path}`);
  }
}

function writeTime(file) {
  fs.closeSync(fs.openSync(file, "w"));
}

function checkTime(target, tmpFile) {
  return fs.statSync(target).atime > fs.statSync(tmpFile).atime;
}
