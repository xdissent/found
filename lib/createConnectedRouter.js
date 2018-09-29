"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = createConnectedRouter;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _reactRedux = require("react-redux");

var _ActionTypes = _interopRequireDefault(require("./ActionTypes"));

var _createBaseRouter = _interopRequireDefault(require("./createBaseRouter"));

var _createStoreRouterObject = _interopRequireDefault(require("./utils/createStoreRouterObject"));

function resolveMatch(match) {
  return {
    type: _ActionTypes.default.RESOLVE_MATCH,
    payload: match
  };
}

function createConnectedRouter(_ref) {
  var _ref$getFound = _ref.getFound,
      getFound = _ref$getFound === void 0 ? function (_ref2) {
    var found = _ref2.found;
    return found;
  } : _ref$getFound,
      options = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["getFound"]);
  var ConnectedRouter = (0, _reactRedux.connect)(function (state) {
    var _getFound = getFound(state),
        match = _getFound.match,
        resolvedMatch = _getFound.resolvedMatch;

    return {
      match: match,
      resolvedMatch: resolvedMatch
    };
  }, {
    onResolveMatch: resolveMatch
  }, null, {
    // Don't block context propagation from above. The router should seldom
    // be unnecessarily rerendering anyway.
    pure: false,
    getDisplayName: function getDisplayName() {
      return 'ConnectedRouter';
    }
  })((0, _createBaseRouter.default)(options)); // TODO: Use connectAdvanced.
  // This implementation is very messy, but it provides the cleanest API to get
  // these methods into the base router from the store, since they're already
  // on the store context.
  // Overwriting the method instead of extending the class is used to avoid
  // issues with compatibility on IE <= 10.

  var baseAddExtraProps = ConnectedRouter.prototype.addExtraProps;

  function addExtraProps(props) {
    if (!this.router) {
      this.router = (0, _createStoreRouterObject.default)(this.props.store || this.context.store);
    }

    return (0, _extends2.default)({}, baseAddExtraProps.call(this, props), {
      router: this.router
    });
  }

  ConnectedRouter.prototype.addExtraProps = addExtraProps;
  return ConnectedRouter;
}