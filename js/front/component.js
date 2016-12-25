const m = require('mithril');
const JsToTkcode = require('../lib/js-to-tkcode');

const component = {
  controller: function () {
    const input = m.prop('TEST');
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
      getOutput: () => {
        // TODO
        let ret = '';
        try {
          ret = jsToTkcode.translate(input());
        } catch (e) {
          console.log(e);
        }

        return ret;
      }
    };
  },
  view: (ctrl) => {
    // const vm = ctrl.vm;
    return m('.app', [
      m('h1', 'JavaScript to TKcode'),
      m('.main', [
        m('textarea#input', {
          onkeyup: m.withAttr('value', ctrl.input)
        }, ctrl.input()),
        m('textarea#output', {
          readonly: 'readonly',
          onfocus: (e) => { e.target.select(); }
        }, ctrl.getOutput())
      ])
    ]);
  }
};

module.exports = component;
