"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _react = _interopRequireDefault(require("react"));

var _warning = _interopRequireDefault(require("warning"));

var _PropTypes = require("./PropTypes");

var propTypes = {
  Component: _elementType.default,
  to: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]).isRequired,
  match: _propTypes.default.object.isRequired,
  activeClassName: _propTypes.default.string,
  activeStyle: _propTypes.default.object,
  activePropName: _propTypes.default.string,
  router: _PropTypes.routerShape.isRequired,
  exact: _propTypes.default.bool,
  target: _propTypes.default.string,
  onClick: _propTypes.default.func,
  childProps: _propTypes.default.object // In case of name conflicts here.

};
var defaultProps = {
  Component: 'a',
  exact: false
};

var BaseLink =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(BaseLink, _React$Component);

  function BaseLink() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onClick", function (event) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          target = _this$props.target,
          router = _this$props.router,
          to = _this$props.to;

      if (onClick) {
        onClick(event);
      } // Don't do anything if the user's onClick handler prevented default.
      // Otherwise, let the browser handle the link with the computed href if the
      // event wasn't an unmodified left click, or if the link has a target.


      if (event.defaultPrevented || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0 || target) {
        return;
      }

      event.preventDefault(); // FIXME: When clicking on a link to the same location in the browser, the
      // actual becomes a replace rather than a push. We may want the same
      // handling – perhaps implemented in the Farce protocol.

      router.push(to);
    });
    return _this;
  }

  var _proto = BaseLink.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        Component = _this$props2.Component,
        to = _this$props2.to,
        match = _this$props2.match,
        activeClassName = _this$props2.activeClassName,
        activeStyle = _this$props2.activeStyle,
        activePropName = _this$props2.activePropName,
        router = _this$props2.router,
        exact = _this$props2.exact,
        childProps = _this$props2.childProps,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["Component", "to", "match", "activeClassName", "activeStyle", "activePropName", "router", "exact", "childProps"]);

    if (process.env.NODE_ENV !== "production" && props.component) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(typeof Component === 'function', 'Link to %s with `component` prop `%s` has an element type that ' + 'is not a component. The expected prop for the link component is ' + '`Component`.', JSON.stringify(to), props.component.displayName || props.component.name) : void 0;
    }

    if (activeClassName || activeStyle || activePropName) {
      var toLocation = router.createLocation(to);
      var active = router.isActive(match, toLocation, {
        exact: exact
      });

      if (active) {
        if (activeClassName) {
          props.className = props.className ? props.className + " " + activeClassName : activeClassName;
        }

        if (activeStyle) {
          props.style = (0, _extends2.default)({}, props.style, activeStyle);
        }
      }

      if (activePropName) {
        props[activePropName] = active;
      }
    }

    return _react.default.createElement(Component, (0, _extends2.default)({}, props, childProps, {
      href: router.createHref(to),
      onClick: this.onClick // This overrides props.onClick.

    }));
  };

  return BaseLink;
}(_react.default.Component);

BaseLink.propTypes = propTypes;
BaseLink.defaultProps = defaultProps;
var _default = BaseLink;
exports.default = _default;