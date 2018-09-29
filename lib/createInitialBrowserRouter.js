"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = createInitialBrowserRouter;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _BrowserProtocol = _interopRequireDefault(require("farce/lib/BrowserProtocol"));

var _createInitialFarceRouter = _interopRequireDefault(require("./createInitialFarceRouter"));

var _resolver = _interopRequireDefault(require("./resolver"));

function createInitialBrowserRouter(options) {
  return (0, _createInitialFarceRouter.default)((0, _extends2.default)({}, options, {
    historyProtocol: new _BrowserProtocol.default(),
    resolver: _resolver.default
  }));
}