"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = createWithRouter;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _reactRedux = require("react-redux");

var _PropTypes = require("./PropTypes");

var routerContextTypes = {
  router: _PropTypes.routerShape.isRequired
};

function createWithRouter(_ref) {
  var _ref$getFound = _ref.getFound,
      getFound = _ref$getFound === void 0 ? function (_ref2) {
    var found = _ref2.found;
    return found;
  } : _ref$getFound,
      _ref$matchKey = _ref.matchKey,
      matchKey = _ref$matchKey === void 0 ? 'resolvedMatch' : _ref$matchKey;
  var withMatch = (0, _reactRedux.connect)(function (state) {
    return {
      match: getFound(state)[matchKey]
    };
  }, null, function (stateProps, dispatchProps, ownProps) {
    return (0, _extends2.default)({}, ownProps, stateProps);
  }, // This needs to be pure, to avoid rerendering on changes to other matchKey
  // values in the store.
  {
    getDisplayName: function getDisplayName(name) {
      return "withRouter(" + name + ")";
    }
  });
  return function withRouter(Component) {
    var ConnectedComponent = withMatch(Component); // Yes, this is pretty gross. It's the simplest way to inject router as
    // a prop without adding yet another wrapper component, though.

    ConnectedComponent.contextTypes = (0, _extends2.default)({}, ConnectedComponent.contextTypes, routerContextTypes); // TODO: Use connectAdvanced.
    // Overwriting the method instead of extending the class is used to avoid
    // issues with compatibility on IE <= 10.

    var baseAddExtraProps = ConnectedComponent.prototype.addExtraProps;

    function addExtraProps(props) {
      return (0, _extends2.default)({}, baseAddExtraProps.call(this, props), {
        // It's safe to read from the context because the router context
        // methods should never change. With the default implementation, they
        // in fact can't change.
        router: this.context.router
      });
    }

    ConnectedComponent.prototype.addExtraProps = addExtraProps;
    return ConnectedComponent;
  };
}