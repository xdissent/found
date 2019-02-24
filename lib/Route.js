"use strict";

exports.__esModule = true;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convenience class for creating normal routes with JSX. When not using JSX,
 * use a POJSO instead of this class.
 */
var Route = function Route(props) {
  (0, _classCallCheck3.default)(this, Route);

  (0, _assign2.default)(this, props);
};

exports.default = Route;


if (process.env.NODE_ENV !== "production") {
  // Workaround to make React Proxy give me the original class, to allow
  // makeRouteConfig to get the actual class, when using JSX for routes.
  Route.prototype.isReactComponent = {};
}
module.exports = exports.default;