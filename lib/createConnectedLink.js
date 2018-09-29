"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = createConnectedLink;

var _BaseLink = _interopRequireDefault(require("./BaseLink"));

var _createWithRouter = _interopRequireDefault(require("./createWithRouter"));

var _withRouter = _interopRequireDefault(require("./withRouter"));

function createConnectedLink(options) {
  var withRouter = options ? (0, _createWithRouter.default)(options) : _withRouter.default;
  var ConnectedLink = withRouter(_BaseLink.default);
  ConnectedLink.displayName = 'ConnectedLink';
  return ConnectedLink;
}