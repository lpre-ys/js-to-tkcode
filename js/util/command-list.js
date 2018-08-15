const AddMember = require('./commands/add-member');
const HidePc = require('./commands/hide-pc');
const KeyEntry = require('./commands/key-entry');
const RemoveMember = require('./commands/remove-member');
const MovePlace = require('./commands/move-place');
const StorePlace = require('./commands/store-place');
const ShowPc = require('./commands/show-pc');
const HideScreen = require('./commands/hide-screen');
const ShowScreen = require('./commands/show-screen');
const Flash = require('./commands/flash');
const ShowPicture = require('./commands/show-picture');
const ShowStickyPicture = require('./commands/show-sticky-picture');
const MovePicture = require('./commands/move-picture');
const DeletePicture = require('./commands/delete-picture');
const PlaySound = require('./commands/play-sound');
const LoadBgm = require('./commands/load-bgm');
const SaveBgm = require('./commands/save-bgm');
const PlayBgm = require('./commands/play-bgm');
const StopBgm = require('./commands/stop-bgm');
const FadeoutBgm = require('./commands/fadeout-bgm');
const Choice = require('./commands/choice');
const ExitEvent = require('./commands/exit-event');
const Rand = require('./commands/rand');
const RangeAssign = require('./commands/range-assign');
const RangeBoolean = require('./commands/range-boolean');
const CallEvent = require('./commands/call-event');
const CallMapEvent = require('./commands/call-map-event');
const Wait = require('./commands/wait');
const ExecAllAction = require('./commands/exec-all-action');
const StartAction = require('./commands/start-action');
const Action = require('./commands/action');
const ActionSound = require('./commands/action-sound');
const ActionSwitch = require('./commands/action-switch');
const ActionGraphic = require('./commands/action-graphic');
const Effect = require('./commands/effect');
const MoveEvent = require('./commands/move-event');
const Message = require('./commands/message');
const ChangeTone = require('./commands/change-tone');
const Label = require('./commands/label');
const Goto = require('./commands/goto');
const ArrayUtil = require('./commands/array-util');
const SetString = require('./commands/set-string');
const ClearString = require('./commands/clear-string');
const MessageOption = require('./commands/message-option');
const ResetFace = require('./commands/reset-face');

const StackInit = require('./commands/stack/stack-init');
const StackPush = require('./commands/stack/stack-push');
const StackPop = require('./commands/stack/stack-pop');

const QueueInit = require('./commands/queue/queue-init');
const QueueEnqueue = require('./commands/queue/queue-enqueue');
const QueueDequeue = require('./commands/queue/queue-dequeue');
const QueueIsEmpty = require('./commands/queue/queue-is-empty');
const QueueRevert = require('./commands/queue/queue-revert');

const Raw = require('./commands/raw');
const Comment = require('./commands/comment');

const SetDbRow = require('./commands/set-db-row');
const Import = require('./commands/import');

const commandList = {
  KeyEntry,
  AddMember,
  RemoveMember,
  MovePlace,
  StorePlace,
  HidePc,
  ShowPc,
  HideScreen,
  ShowScreen,
  Flash,
  ShowPicture,
  ShowStickyPicture,
  MovePicture,
  DeletePicture,
  PlaySound,
  LoadBgm,
  SaveBgm,
  PlayBgm,
  StopBgm,
  FadeoutBgm,
  Choice,
  ExitEvent,
  CallEvent,
  CallMapEvent,
  Rand,
  RangeAssign,
  RangeBoolean,
  Wait,
  ExecAllAction,
  StartAction,
  Action,
  ActionSound,
  ActionSwitch,
  ActionGraphic,
  Effect,
  MoveEvent,
  Message,
  ChangeTone,
  Label,
  Goto,
  ArrayUtil,
  SetString,
  ClearString,
  MessageOption,
  ResetFace,
  StackInit,
  StackPush,
  StackPop,
  QueueInit,
  QueueEnqueue,
  QueueDequeue,
  QueueIsEmpty,
  QueueRevert,
  Comment,
  Raw,
  SetDbRow,
  Import
};

module.exports = commandList;
