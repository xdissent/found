'use strict';

exports.__esModule = true;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = createConnectedRouter;

var _reactRedux = require('react-redux');

var _ActionTypes = require('./ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _createBaseRouter = require('./createBaseRouter');

var _createBaseRouter2 = _interopRequireDefault(_createBaseRouter);

var _injectRouterProp = require('./utils/injectRouterProp');

var _injectRouterProp2 = _interopRequireDefault(_injectRouterProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveMatch(match) {
  return {
    type: _ActionTypes2.default.RESOLVE_MATCH,
    payload: match
  };
}

function createConnectedRouter(_ref) {
  var _ref$getFound = _ref.getFound,
      getFound = _ref$getFound === undefined ? function (_ref2) {
    var found = _ref2.found;
    return found;
  } : _ref$getFound,
      options = (0, _objectWithoutProperties3.default)(_ref, ['getFound']);

  return (0, _injectRouterProp2.default)((0, _reactRedux.connect)(function (state) {
    var _getFound = getFound(state),
        match = _getFound.match,
        resolvedMatch = _getFound.resolvedMatch;

    return { match: match, resolvedMatch: resolvedMatch };
  }, {
    onResolveMatch: resolveMatch
  }, null, {
    // Don't block context propagation from above. The router should seldom
    // be unnecessarily rerendering anyway.
    pure: false,
    getDisplayName: function getDisplayName() {
      return 'ConnectedRouter';
    }
  })((0, _createBaseRouter2.default)(options)));
}
module.exports = exports.default;