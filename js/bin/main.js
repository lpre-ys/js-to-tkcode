const chokidar = require('chokidar');
const parseArgs = require('minimist');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

const yaml = require('js-yaml');
const JsToTkcode = require('../lib/js-to-tkcode');

const args = parseArgs(process.argv);
if (!args.config) {
  args.config = 'js2tk.config.js';
}
const configPath = path.resolve(args.config);
const config = require(configPath);
const scriptsPath = path.resolve(config.scripts);
const libPath = config.lib ? path.resolve(config.lib) : false;

const red     = '\u001b[31m';
// const black   = '\u001b[30m';
const green   = '\u001b[32m';
const yellow  = '\u001b[33m';
//const blue    = '\u001b[34m';
// const magenta = '\u001b[35m';
const cyan    = '\u001b[36m';
// const white   = '\u001b[37m';

const reset   = '\u001b[0m';


// init
console.log(`INIT-START`);
const scripts = [];
readdirRec(scriptsPath, scripts, /.*\.js$/);

const libs = [];
if (libPath) {
  readdirRec(libPath, libs, /.*\.js$/);
}

const pjConfig = yaml.load(fs.readFileSync(path.resolve(config.pjConfig)).toString());
if (config.database) {
  pjConfig['database'] = path.resolve(config.database);
}
const jsToTkcode = new JsToTkcode(pjConfig);
let buildedLib = '';

// load database
jsToTkcode.loadDatabase().then(() => {
  // load lib
  loadLib();

  // build
  scripts.forEach((script) => {
    build(script, buildedLib);
  });
  console.log(`INIT-END`);
});



function build(scriptPath, lib) {
  if (scriptPath.indexOf(config.exclude) > -1) {
    console.log(`${cyan}SKIP${reset}: ${scriptPath.replace(scriptsPath, '')}`);
    return;
  }
  console.log(`BUILD-START: ${scriptPath.replace(scriptsPath, '')}`);

  // ディレクトリが無かったら作っとく
  const tkcodePath = getBuildPath(scriptPath);
  mkdirp.sync(path.dirname(tkcodePath));

  // libをくっつける
  const script = fs.readFileSync(scriptPath).toString() + "\n" + lib;

  // local constを読む
  const localConstPath = scriptPath.replace('.js', '.yaml');
  const localConst = fs.existsSync(localConstPath) ? yaml.safeLoad(fs.readFileSync(localConstPath, 'utf8')) : {};
  try {
    const tkcode = jsToTkcode.translate(script, localConst);
    if (tkcode.match(/undefined/)) {
      console.log(`${yellow}[WARNING] find UNDEFINED${reset}: ${scriptPath.replace(scriptsPath, '')}`);
    }
    fs.writeFileSync(tkcodePath, tkcode);
  } catch (e) {
    console.error(`${red}!!!BUILD-ERROR!!!${reset}: ${scriptPath.replace(scriptsPath, '')}`);
    console.error(`        ${e.message}`);
    // DEBUG
    // console.error(e.stack);
    return;
  }
  console.log(`${green}BUILD-END${reset}: ${scriptPath.replace(scriptsPath, '')}`);
}

function getBuildPath(filepath) {
  const rel = path.resolve(filepath).replace(scriptsPath, '').replace(/\.js$/, '.tkcode');
  const buildPath = path.resolve(`${config.build}${rel}`);
  console.log(buildPath);

  return buildPath;
}

function readdirRec(dir, list, filter = false) {
    fs.readdirSync(dir).forEach((item) => {
        var stat = fs.statSync(path.join(dir, item));
        if (stat.isFile()) {
          if (filter && !filter.test(item)) return;
          list.push(path.resolve(path.join(dir, item)));
        }
        else if (stat.isDirectory()) readdirRec(path.join(dir, item), list, filter);
    });
}

function loadLib() {
  const libTexts = [];
  libs.forEach((lib) => {
    const libText = fs.readFileSync(lib).toString();
    libTexts.push(libText);
  });
  buildedLib = libTexts.join("\n");
}

function loadPjConfig() {
  const pjConfig = yaml.load(fs.readFileSync(path.resolve(config.pjConfig)).toString());
  jsToTkcode.resetConfig(pjConfig);
}

// script watch
const scriptWatcher = chokidar.watch(scriptsPath, {
  ignored: '**/*.yaml',
  persistent:true
});

scriptWatcher.on('ready', () => {
  console.log(`SCRIPT WATCH START`);
  scriptWatcher.on('add', (filepath) => {
    console.log(`SCRIPT ADD: ${filepath}`);
    build(filepath, buildedLib);
  });
  scriptWatcher.on('change', (filepath) => {
    console.log(`SCRIPT CHANGE: ${filepath}`);
    build(filepath, buildedLib);
  });
});

// lib watch
if (libPath) {
  const libWatcher = chokidar.watch(libPath, {
    ignored:/[\/\\]\./,
    persistent:true
  });

  libWatcher.on('ready', () => {
    // 負荷ヤバかったら、loadLibの方式変える
    console.log(`LIB WATCH START`);
    libWatcher.on('add', (filepath) => {
      console.log(`LIB ADD: ${filepath}`);
      loadLib();
    });
    libWatcher.on('change', (filepath) => {
      console.log(`LIB CHANGE: ${filepath}`);
      loadLib();
    });
  });
}

// config watch

const configWatch = chokidar.watch(config.pjConfig);
configWatch.on('ready', () => {
  console.log(`PJ-CONFIG WATCH START`);
  configWatch.on('change', (filepath) => {
    console.log(`PJ-CONFIG CHANGE: ${filepath}`);
    loadPjConfig();
  });
});
