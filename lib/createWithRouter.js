'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createWithRouter;

var _reactRedux = require('react-redux');

var _injectRouterProp = require('./utils/injectRouterProp');

var _injectRouterProp2 = _interopRequireDefault(_injectRouterProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createWithRouter(_ref) {
  var _ref$getFound = _ref.getFound,
      getFound = _ref$getFound === undefined ? function (_ref2) {
    var found = _ref2.found;
    return found;
  } : _ref$getFound,
      _ref$matchKey = _ref.matchKey,
      matchKey = _ref$matchKey === undefined ? 'resolvedMatch' : _ref$matchKey;

  return function withRouter(Component) {
    return (0, _injectRouterProp2.default)((0, _reactRedux.connect)(function (state) {
      return { match: getFound(state)[matchKey] };
    }, null, function (stateProps, dispatchProps, ownProps) {
      return (0, _extends3.default)({}, ownProps, stateProps);
    },
    // This needs to be pure, to avoid rerendering on changes to other
    // matchKey values in the store.
    {
      getDisplayName: function getDisplayName(name) {
        return 'withRouter(' + name + ')';
      }
    })(Component));
  };
}
module.exports = exports.default;