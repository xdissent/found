"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = createFarceStore;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Actions = _interopRequireDefault(require("farce/lib/Actions"));

var _createHistoryEnhancer = _interopRequireDefault(require("farce/lib/createHistoryEnhancer"));

var _queryMiddleware = _interopRequireDefault(require("farce/lib/queryMiddleware"));

var _redux = require("redux");

var _createMatchEnhancer = _interopRequireDefault(require("../createMatchEnhancer"));

var _foundReducer = _interopRequireDefault(require("../foundReducer"));

var _Matcher = _interopRequireDefault(require("../Matcher"));

function createFarceStore(_ref) {
  var historyProtocol = _ref.historyProtocol,
      historyMiddlewares = _ref.historyMiddlewares,
      historyOptions = _ref.historyOptions,
      routeConfig = _ref.routeConfig,
      matcherOptions = _ref.matcherOptions;
  var store = (0, _redux.createStore)((0, _redux.combineReducers)({
    found: _foundReducer.default
  }), (0, _redux.compose)((0, _createHistoryEnhancer.default)((0, _extends2.default)({}, historyOptions, {
    protocol: historyProtocol,
    middlewares: historyMiddlewares || [_queryMiddleware.default]
  })), (0, _createMatchEnhancer.default)(new _Matcher.default(routeConfig, matcherOptions))));
  store.dispatch(_Actions.default.init());
  return store;
}