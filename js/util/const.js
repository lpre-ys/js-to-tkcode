'use strict';

// TODO なんかYamlとかで定義する？
const Const = {
  'KEY_DOWN'  : 1,
  'KEY_LEFT'  : 2,
  'KEY_RIGHT' : 3,
  'KEY_UP'    : 4,
  'KEY_ENTER' : 5,
  'KEY_CANCEL': 6,
  'KEY_SHIFT' : 7,
  // IF-kind
  'IF_KIND_PC': '05',
  // IF-PC-TYPE
  'IF_PC_IN'  : '00',
  // Call-type
  'CALL_COMMON': 0,
  'CALL_MAP': 1,
  // EVENT_TARGET
  'EVENT_HERO': 10001,
  // ACT type
  'ACT_GO_UP': 0,
  'ACT_GO_RIGHT': 1,
  'ACT_GO_DOWN': 2,
  'ACT_GO_LEFT': 3,
  'ACT_GO_RIGHTUP': 4,
  'ACT_GO_RIGHTDOWN': 5,
  'ACT_GO_LEFTDOWN': 6,
  'ACT_GO_LEFTUP': 7,
  'ACT_UP': 12,
  'ACT_RIGHT': 13,
  'ACT_DOWN': 14,
  'ACT_LEFT': 15,
  'ACT_TURN_RIGHT': 16,
  'ACT_TURN_LEFT': 17,
  'ACT_STOP': 23,
  'ACT_JUMP_START': 24,
  'ACT_JUMP_END': 25,
  'ACT_TURN_OFF': 26,
  'ACT_TURN_ON': 27,
  'ACT_SPEED_UP': 28,
  'ACT_SPEED_DOWN': 29,
  'ACT_FREQ_UP': 30,
  'ACT_FREQ_DOWN': 31,
  'ACT_THROUGH_ON': 36,
  'ACT_THROUGH_OFF': 37,
  'ACT_ANIME_STOP': 38,
  'ACT_ANIME_START': 39,
  // SCREEN-EFFECT
  'SCREEN_INHERIT': '-1',
  'SCREEN_FEEDOUT': '00',
  'SCREEN_NO_WAIT': '19'
};

module.exports = Const;
