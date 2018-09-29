"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _RedirectException = _interopRequireDefault(require("./RedirectException"));

var Redirect =
/*#__PURE__*/
function () {
  function Redirect(_ref) {
    var from = _ref.from,
        to = _ref.to;
    this.path = from;
    this.to = to;
  }

  var _proto = Redirect.prototype;

  _proto.render = function render(_ref2) {
    var match = _ref2.match;
    var to = this.to;
    var toLocation;

    if (typeof to === 'function') {
      toLocation = to(match);
    } else {
      var router = match.router,
          params = match.params;
      toLocation = router.matcher.format(to, params);
    }

    throw new _RedirectException.default(toLocation);
  };

  return Redirect;
}();

exports.default = Redirect;

if (process.env.NODE_ENV !== "production") {
  // Workaround to make React Proxy give me the original class, to allow
  // makeRouteConfig to get the actual class, when using JSX for routes.
  Redirect.prototype.isReactComponent = {};
}