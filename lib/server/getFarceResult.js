"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getFarceResult;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Actions = _interopRequireDefault(require("farce/lib/Actions"));

var _ServerProtocol = _interopRequireDefault(require("farce/lib/ServerProtocol"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _getStoreRenderArgs = _interopRequireDefault(require("../getStoreRenderArgs"));

var _RedirectException = _interopRequireDefault(require("../RedirectException"));

var _resolver = _interopRequireDefault(require("../resolver"));

var _createFarceStore = _interopRequireDefault(require("../utils/createFarceStore"));

var _RouterProvider = _interopRequireDefault(require("./RouterProvider"));

function getFarceResult(_x) {
  return _getFarceResult.apply(this, arguments);
}

function _getFarceResult() {
  _getFarceResult = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var url, historyMiddlewares, historyOptions, routeConfig, matchContext, _ref$resolver, resolver, render, store, renderArgs;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = _ref.url, historyMiddlewares = _ref.historyMiddlewares, historyOptions = _ref.historyOptions, routeConfig = _ref.routeConfig, matchContext = _ref.matchContext, _ref$resolver = _ref.resolver, resolver = _ref$resolver === void 0 ? _resolver.default : _ref$resolver, render = _ref.render;
            store = (0, _createFarceStore.default)({
              historyProtocol: new _ServerProtocol.default(url),
              historyMiddlewares: historyMiddlewares,
              historyOptions: historyOptions,
              routeConfig: routeConfig
            });
            _context.prev = 2;
            _context.next = 5;
            return (0, _getStoreRenderArgs.default)({
              store: store,
              matchContext: matchContext,
              resolver: resolver
            });

          case 5:
            renderArgs = _context.sent;
            _context.next = 13;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);

            if (!(_context.t0 instanceof _RedirectException.default)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", {
              redirect: {
                url: store.farce.createHref(_context.t0.location)
              }
            });

          case 12:
            throw _context.t0;

          case 13:
            _context.prev = 13;
            // This is a no-op with ServerProtocol, but it doesn't hurt.
            store.dispatch(_Actions.default.dispose());
            return _context.finish(13);

          case 16:
            return _context.abrupt("return", {
              status: renderArgs.error ? renderArgs.error.status : 200,
              element: _react.default.createElement(_reactRedux.Provider, {
                store: store
              }, _react.default.createElement(_RouterProvider.default, {
                router: renderArgs.router
              }, render(renderArgs)))
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 8, 13, 16]]);
  }));
  return _getFarceResult.apply(this, arguments);
}