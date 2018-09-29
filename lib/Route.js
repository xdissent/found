"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Convenience class for creating normal routes with JSX. When not using JSX,
 * use a POJSO instead of this class.
 */
var Route = function Route(props) {
  Object.assign(this, props);
};

exports.default = Route;

if (process.env.NODE_ENV !== "production") {
  // Workaround to make React Proxy give me the original class, to allow
  // makeRouteConfig to get the actual class, when using JSX for routes.
  Route.prototype.isReactComponent = {};
}