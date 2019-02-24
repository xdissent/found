'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _createFarceRouter = require('./createFarceRouter');

var _createFarceRouter2 = _interopRequireDefault(_createFarceRouter);

var _getStoreRenderArgs = require('./getStoreRenderArgs');

var _getStoreRenderArgs2 = _interopRequireDefault(_getStoreRenderArgs);

var _createFarceStore = require('./utils/createFarceStore');

var _createFarceStore2 = _interopRequireDefault(_createFarceStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var historyProtocol = _ref2.historyProtocol,
        historyMiddlewares = _ref2.historyMiddlewares,
        historyOptions = _ref2.historyOptions,
        routeConfig = _ref2.routeConfig,
        matchContext = _ref2.matchContext,
        resolver = _ref2.resolver,
        options = (0, _objectWithoutProperties3.default)(_ref2, ['historyProtocol', 'historyMiddlewares', 'historyOptions', 'routeConfig', 'matchContext', 'resolver']);
    var store, FarceRouter, initialRenderArgs;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            store = (0, _createFarceStore2.default)({
              historyProtocol: historyProtocol,
              historyMiddlewares: historyMiddlewares,
              historyOptions: historyOptions,
              routeConfig: routeConfig
            });
            FarceRouter = (0, _createFarceRouter2.default)((0, _extends3.default)({}, options, { store: store }));

            // This intentionally doesn't handle RedirectExceptions, because those
            // shouldn't happen here anyway.

            _context.next = 4;
            return (0, _getStoreRenderArgs2.default)({
              store: store,
              matchContext: matchContext,
              resolver: resolver
            });

          case 4:
            initialRenderArgs = _context.sent;


            // We own this FarceRouter, so it's safe to replace its default props.
            FarceRouter.defaultProps = (0, _extends3.default)({}, FarceRouter.defaultProps, {
              matchContext: matchContext,
              resolver: resolver,
              initialRenderArgs: initialRenderArgs
            });

            return _context.abrupt('return', FarceRouter);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function createInitialFarceRouter(_x) {
    return _ref.apply(this, arguments);
  }

  return createInitialFarceRouter;
}();

module.exports = exports.default;