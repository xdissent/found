'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createInitialBrowserRouter;

var _BrowserProtocol = require('farce/lib/BrowserProtocol');

var _BrowserProtocol2 = _interopRequireDefault(_BrowserProtocol);

var _createInitialFarceRouter = require('./createInitialFarceRouter');

var _createInitialFarceRouter2 = _interopRequireDefault(_createInitialFarceRouter);

var _resolver = require('./resolver');

var _resolver2 = _interopRequireDefault(_resolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createInitialBrowserRouter(options) {
  return (0, _createInitialFarceRouter2.default)((0, _extends3.default)({}, options, {
    historyProtocol: new _BrowserProtocol2.default(),
    resolver: _resolver2.default
  }));
}
module.exports = exports.default;