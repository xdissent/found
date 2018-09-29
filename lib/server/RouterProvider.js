"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _PropTypes = require("../PropTypes");

var propTypes = {
  router: _PropTypes.routerShape.isRequired,
  children: _propTypes.default.element.isRequired
};
var childContextTypes = {
  router: _PropTypes.routerShape.isRequired
};

var RouterProvider =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(RouterProvider, _React$Component);

  function RouterProvider() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RouterProvider.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      router: this.props.router
    };
  }; // This doesn't need the logic for changes to the router object; it's only
  // used for server-side rendering and should only render once.


  _proto.render = function render() {
    return this.props.children;
  };

  return RouterProvider;
}(_react.default.Component);

RouterProvider.propTypes = propTypes;
RouterProvider.childContextTypes = childContextTypes;
var _default = RouterProvider;
exports.default = _default;