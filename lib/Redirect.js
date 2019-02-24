'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _RedirectException = require('./RedirectException');

var _RedirectException2 = _interopRequireDefault(_RedirectException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Redirect = function () {
  function Redirect(_ref) {
    var from = _ref.from,
        to = _ref.to;
    (0, _classCallCheck3.default)(this, Redirect);

    this.path = from;
    this.to = to;
  }

  Redirect.prototype.render = function render(_ref2) {
    var match = _ref2.match;
    var to = this.to;

    var toLocation = void 0;

    if (typeof to === 'function') {
      toLocation = to(match);
    } else {
      var router = match.router,
          params = match.params;

      toLocation = router.matcher.format(to, params);
    }

    throw new _RedirectException2.default(toLocation);
  };

  return Redirect;
}();

exports.default = Redirect;


if (process.env.NODE_ENV !== 'production') {
  // Workaround to make React Proxy give me the original class, to allow
  // makeRouteConfig to get the actual class, when using JSX for routes.
  Redirect.prototype.isReactComponent = {};
}
module.exports = exports.default;