const m = require('mithril');
const JsToTkcode = require('../lib/js-to-tkcode');
const yaml = require('js-yaml');

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
