"use strict";

var _ObsSwitcher = _interopRequireDefault(require("./components/ObsSwitcher"));

var _Chat = _interopRequireDefault(require("./components/Chat"));

var _NodeMediaServer = _interopRequireDefault(require("./components/NodeMediaServer"));

var _config = _interopRequireDefault(require("../config"));

var _package = require("../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(`
██╗██████╗░██╗░░░░░  ████████╗░█████╗░░█████╗░██╗░░░░░ By Boyke
██║██╔══██╗██║░░░░░  ╚══██╔══╝██╔══██╗██╔══██╗██║░░░░░
██║██████╔╝██║░░░░░  ░░░██║░░░██║░░██║██║░░██║██║░░░░░
██║██╔══██╗██║░░░░░  ░░░██║░░░██║░░██║██║░░██║██║░░░░░
██║██║░░██║███████╗  ░░░██║░░░╚█████╔╝╚█████╔╝███████╗
╚═╝╚═╝░░╚═╝╚══════╝  ░░░╚═╝░░░░╚════╝░░╚════╝░╚══════╝ `);
var obs = new _ObsSwitcher.default(_config.default.obs.ip, _config.default.obs.password, _config.default.obs.lowBitrateScene, _config.default.obs.normalScene, _config.default.obs.offlineScene, _config.default.obs.lowBitrateTrigger, _config.default.obs.highRttTrigger);

if (_config.default.twitchChat.enable) {
  var chat = new _Chat.default(_config.default.twitchChat.botUsername, _config.default.twitchChat.oauth, _config.default.twitchChat.channel, obs);
}

var nodeMediaServer = new _NodeMediaServer.default(_config.default.nodeMediaServer, obs);