"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = createFarceRouter;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _Actions = _interopRequireDefault(require("farce/lib/Actions"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _createConnectedRouter = _interopRequireDefault(require("./createConnectedRouter"));

var _createFarceStore = _interopRequireDefault(require("./utils/createFarceStore"));

function createFarceRouter(_ref) {
  var store = _ref.store,
      historyProtocol = _ref.historyProtocol,
      historyMiddlewares = _ref.historyMiddlewares,
      historyOptions = _ref.historyOptions,
      routeConfig = _ref.routeConfig,
      matcherOptions = _ref.matcherOptions,
      options = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["store", "historyProtocol", "historyMiddlewares", "historyOptions", "routeConfig", "matcherOptions"]);
  var ConnectedRouter = (0, _createConnectedRouter.default)(options);

  var FarceRouter =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(FarceRouter, _React$Component);

    function FarceRouter(props, context) {
      var _this;

      _this = _React$Component.call(this, props, context) || this;
      _this.store = store || (0, _createFarceStore.default)({
        historyProtocol: historyProtocol,
        historyMiddlewares: historyMiddlewares,
        historyOptions: historyOptions,
        routeConfig: routeConfig,
        matcherOptions: matcherOptions
      });
      return _this;
    }

    var _proto = FarceRouter.prototype;

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.store.dispatch(_Actions.default.dispose());
    };

    _proto.render = function render() {
      return _react.default.createElement(_reactRedux.Provider, {
        store: this.store
      }, _react.default.createElement(ConnectedRouter, this.props));
    };

    return FarceRouter;
  }(_react.default.Component);

  return FarceRouter;
}