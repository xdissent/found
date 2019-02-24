'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Actions = require('farce/lib/Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _ServerProtocol = require('farce/lib/ServerProtocol');

var _ServerProtocol2 = _interopRequireDefault(_ServerProtocol);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _getStoreRenderArgs = require('../getStoreRenderArgs');

var _getStoreRenderArgs2 = _interopRequireDefault(_getStoreRenderArgs);

var _RedirectException = require('../RedirectException');

var _RedirectException2 = _interopRequireDefault(_RedirectException);

var _resolver = require('../resolver');

var _resolver2 = _interopRequireDefault(_resolver);

var _createFarceStore = require('../utils/createFarceStore');

var _createFarceStore2 = _interopRequireDefault(_createFarceStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var url = _ref2.url,
        historyMiddlewares = _ref2.historyMiddlewares,
        historyOptions = _ref2.historyOptions,
        routeConfig = _ref2.routeConfig,
        matchContext = _ref2.matchContext,
        _ref2$resolver = _ref2.resolver,
        resolver = _ref2$resolver === undefined ? _resolver2.default : _ref2$resolver,
        render = _ref2.render;
    var store, renderArgs;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = (0, _createFarceStore2.default)({
              historyProtocol: new _ServerProtocol2.default(url),
              historyMiddlewares: historyMiddlewares,
              historyOptions: historyOptions,
              routeConfig: routeConfig
            });
            renderArgs = void 0;
            _context.prev = 2;
            _context.next = 5;
            return (0, _getStoreRenderArgs2.default)({
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
            _context.t0 = _context['catch'](2);

            if (!(_context.t0 instanceof _RedirectException2.default)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', {
              redirect: {
                url: store.farce.createHref(_context.t0.location)
              }
            });

          case 12:
            throw _context.t0;

          case 13:
            _context.prev = 13;

            // This is a no-op with ServerProtocol, but it doesn't hurt.
            store.dispatch(_Actions2.default.dispose());
            return _context.finish(13);

          case 16:
            return _context.abrupt('return', {
              status: renderArgs.error ? renderArgs.error.status : 200,
              element: _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                render(renderArgs)
              )
            });

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 8, 13, 16]]);
  }));

  function getFarceResult(_x) {
    return _ref.apply(this, arguments);
  }

  return getFarceResult;
}();

module.exports = exports.default;