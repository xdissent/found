"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = createBrowserRouter;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _BrowserProtocol = _interopRequireDefault(require("farce/lib/BrowserProtocol"));

var _react = _interopRequireDefault(require("react"));

var _createFarceRouter = _interopRequireDefault(require("./createFarceRouter"));

var _createRender = _interopRequireDefault(require("./createRender"));

var _resolver = _interopRequireDefault(require("./resolver"));

function createBrowserRouter(_ref) {
  var render = _ref.render,
      renderPending = _ref.renderPending,
      renderReady = _ref.renderReady,
      renderError = _ref.renderError,
      options = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["render", "renderPending", "renderReady", "renderError"]);
  var FarceRouter = (0, _createFarceRouter.default)((0, _extends2.default)({}, options, {
    historyProtocol: new _BrowserProtocol.default(),
    render: render || (0, _createRender.default)({
      renderPending: renderPending,
      renderReady: renderReady,
      renderError: renderError
    })
  }));

  function BrowserRouter(props) {
    return _react.default.createElement(FarceRouter, (0, _extends2.default)({}, props, {
      resolver: _resolver.default
    }));
  }

  return BrowserRouter;
}