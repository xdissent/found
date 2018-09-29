"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = makeRouteConfig;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

function buildRouteConfig(node, routeConfig) {
  _react.default.Children.forEach(node, function (child) {
    if (!_react.default.isValidElement(child)) {
      return;
    }

    var Type = child.type;
    var _child$props = child.props,
        children = _child$props.children,
        props = (0, _objectWithoutPropertiesLoose2.default)(_child$props, ["children"]);

    if (Type === _react.default.Fragment) {
      buildRouteConfig(children, routeConfig);
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      if (Type.prototype.constructor !== Type) {
        // Unwrap proxies from react-proxy. This isn't strictly necessary.
        // eslint-disable-next-line no-param-reassign
        Type = Type.prototype.constructor;
      } else if ( // eslint-disable-next-line no-underscore-dangle
      Type.__reactstandin__getCurrent) {
        // Unwrap proxies from react-stand-in.
        // eslint-disable-next-line no-param-reassign
        Type = Object.getPrototypeOf(Type);
      }
    }

    var route = new Type(props);

    if (children) {
      if (_react.default.isValidElement(children) || Array.isArray(children)) {
        // eslint-disable-next-line no-use-before-define
        route.children = makeRouteConfig(children);
      } else {
        var routeGroups = {};
        Object.entries(children).forEach(function (_ref) {
          var groupName = _ref[0],
              groupRoutes = _ref[1];
          // eslint-disable-next-line no-use-before-define
          routeGroups[groupName] = makeRouteConfig(groupRoutes);
        });
        route.children = routeGroups;
      }
    }

    routeConfig.push(route);
  });

  return routeConfig;
}
/**
 * Create a route configuration from JSX configuration elements.
 */


function makeRouteConfig(node) {
  return buildRouteConfig(node, []);
}