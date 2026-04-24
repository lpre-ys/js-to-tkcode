import AddMember from './commands/add-member.js';
import HidePc from './commands/hide-pc.js';
import KeyEntry from './commands/key-entry.js';
import InputNumber from './commands/input-number.js';
import RemoveMember from './commands/remove-member.js';
import MovePlace from './commands/move-place.js';
import StorePlace from './commands/store-place.js';
import ShowPc from './commands/show-pc.js';
import HideScreen from './commands/hide-screen.js';
import ShowScreen from './commands/show-screen.js';
import SetTransition from './commands/set-transition.js';
import EventFlash from './commands/event-flash.js';
import Flash from './commands/flash.js';
import ShowPicture from './commands/show-picture.js';
import ShowStickyPicture from './commands/show-sticky-picture.js';
import MovePicture from './commands/move-picture.js';
import DeletePicture from './commands/delete-picture.js';
import PlaySound from './commands/play-sound.js';
import LoadBgm from './commands/load-bgm.js';
import SaveBgm from './commands/save-bgm.js';
import PlayBgm from './commands/play-bgm.js';
import StopBgm from './commands/stop-bgm.js';
import FadeoutBgm from './commands/fadeout-bgm.js';
import Choice from './commands/choice.js';
import ExitEvent from './commands/exit-event.js';
import Rand from './commands/rand.js';
import RangeAssign from './commands/range-assign.js';
import RangeBoolean from './commands/range-boolean.js';
import GetCharaInfo from './commands/get-chara-info.js';
import GetTick from './commands/get-tick.js';
import CallEvent from './commands/call-event.js';
import CallMapEvent from './commands/call-map-event.js';
import Wait from './commands/wait.js';
import ExecAllAction from './commands/exec-all-action.js';
import CancelAllAction from './commands/cancel-all-action.js';
import StartAction from './commands/start-action.js';
import Action from './commands/action.js';
import ActionSound from './commands/action-sound.js';
import ActionSwitch from './commands/action-switch.js';
import ActionGraphic from './commands/action-graphic.js';
import Effect from './commands/effect.js';
import MoveEvent from './commands/move-event.js';
import Message from './commands/message.js';
import ChangeTone from './commands/change-tone.js';
import Label from './commands/label.js';
import Goto from './commands/goto.js';
import ArrayUtil from './commands/array-util.js';
import SetString from './commands/set-string.js';
import ClearString from './commands/clear-string.js';
import MessageOption from './commands/message-option.js';
import ResetFace from './commands/reset-face.js';
import ChangeBg from './commands/change-bg.js';
import Weather from './commands/weather.js';
import LockCamera from './commands/lock-camera.js';
import ReleaseCamera from './commands/release-camera.js';
import StackInit from './commands/stack/stack-init.js';
import StackPush from './commands/stack/stack-push.js';
import StackPop from './commands/stack/stack-pop.js';
import QueueInit from './commands/queue/queue-init.js';
import QueueEnqueue from './commands/queue/queue-enqueue.js';
import QueueDequeue from './commands/queue/queue-dequeue.js';
import QueueIsEmpty from './commands/queue/queue-is-empty.js';
import QueueRevert from './commands/queue/queue-revert.js';
import Raw from './commands/raw.js';
import Comment from './commands/comment.js';
import SetDbRow from './commands/set-db-row.js';
import Import from './commands/import.js';





const commandList = {
  KeyEntry,
  InputNumber,
  AddMember,
  RemoveMember,
  MovePlace,
  StorePlace,
  HidePc,
  ShowPc,
  HideScreen,
  ShowScreen,
  SetTransition,
  Flash,
  EventFlash,
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
  GetCharaInfo,
  GetTick,
  Wait,
  ExecAllAction,
  CancelAllAction,
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
  ChangeBg,
  Weather,
  LockCamera,
  ReleaseCamera,
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
  Import,
};

export default commandList;
