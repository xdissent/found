'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createBrowserRouter;

var _BrowserProtocol = require('farce/lib/BrowserProtocol');

var _BrowserProtocol2 = _interopRequireDefault(_BrowserProtocol);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createFarceRouter = require('./createFarceRouter');

var _createFarceRouter2 = _interopRequireDefault(_createFarceRouter);

var _resolver = require('./resolver');

var _resolver2 = _interopRequireDefault(_resolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createBrowserRouter(options) {
  var FarceRouter = (0, _createFarceRouter2.default)((0, _extends3.default)({}, options, {
    historyProtocol: new _BrowserProtocol2.default()
  }));

  function BrowserRouter(props) {
    return _react2.default.createElement(FarceRouter, (0, _extends3.default)({ resolver: _resolver2.default }, props));
  }

  return BrowserRouter;
}
module.exports = exports.default;