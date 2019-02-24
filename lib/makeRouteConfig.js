'use strict';

exports.__esModule = true;

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = makeRouteConfig;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildRouteConfig(node, routeConfig) {
  _react2.default.Children.forEach(node, function (child) {
    if (!_react2.default.isValidElement(child)) {
      return;
    }

    var Type = child.type;
    var _child$props = child.props,
        children = _child$props.children,
        props = (0, _objectWithoutProperties3.default)(_child$props, ['children']);


    if (Type === _react2.default.Fragment) {
      buildRouteConfig(children, routeConfig);
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (Type.prototype.constructor !== Type) {
        // Unwrap proxies from react-proxy. This isn't strictly necessary.
        // eslint-disable-next-line no-param-reassign
        Type = Type.prototype.constructor;
      } else if (
      // eslint-disable-next-line no-underscore-dangle
      Type.__reactstandin__getCurrent) {
        // Unwrap proxies from react-stand-in.
        // eslint-disable-next-line no-param-reassign
        Type = (0, _getPrototypeOf2.default)(Type);
      }
    }

    var route = new Type(props);

    if (children) {
      if (_react2.default.isValidElement(children) || Array.isArray(children)) {
        // eslint-disable-next-line no-use-before-define
        route.children = makeRouteConfig(children);
      } else {
        var routeGroups = {};
        (0, _entries2.default)(children).forEach(function (_ref) {
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
module.exports = exports.default;