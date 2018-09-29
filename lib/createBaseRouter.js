"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = createBaseRouter;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _asyncIterator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncIterator"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactStaticContainer = _interopRequireDefault(require("react-static-container"));

var _warning = _interopRequireDefault(require("warning"));

var _PropTypes = require("./PropTypes");

var _RedirectException = _interopRequireDefault(require("./RedirectException"));

var _resolveRenderArgs = _interopRequireDefault(require("./utils/resolveRenderArgs"));

function createBaseRouter(_ref) {
  var render = _ref.render;
  var propTypes = {
    match: _propTypes.default.object.isRequired,
    resolvedMatch: _propTypes.default.object.isRequired,
    matchContext: _propTypes.default.any,
    resolver: _propTypes.default.shape({
      resolveElements: _propTypes.default.func.isRequired
    }).isRequired,
    router: _PropTypes.routerShape.isRequired,
    onResolveMatch: _propTypes.default.func.isRequired,
    initialRenderArgs: _propTypes.default.object
  };
  var childContextTypes = {
    router: _PropTypes.routerShape.isRequired
  };

  var BaseRouter =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(BaseRouter, _React$Component);

    function BaseRouter(props, context) {
      var _this;

      _this = _React$Component.call(this, props, context) || this;
      var router = props.router,
          initialRenderArgs = props.initialRenderArgs;
      _this.state = {
        element: initialRenderArgs ? render(initialRenderArgs) : null
      };
      _this.mounted = true;
      _this.shouldResolveMatch = false;
      _this.pendingResolvedMatch = false;
      _this.childContext = {
        router: router
      };
      return _this;
    }

    var _proto = BaseRouter.prototype;

    _proto.getChildContext = function getChildContext() {
      return this.childContext;
    }; // We use componentDidMount and componentDidUpdate to resolve the match if
    // needed because element resolution is asynchronous anyway, and this lets
    // us not worry about setState not being available in the constructor, or
    // about having to pass around nextProps.


    _proto.componentDidMount = function componentDidMount() {
      if (!this.props.initialRenderArgs) {
        this.resolveMatch();
      }

      if (process.env.NODE_ENV !== "production" && typeof window !== 'undefined') {
        /* eslint-env browser */

        /* eslint-disable no-underscore-dangle */
        if (window.__FOUND_HOT_RELOAD__) {
          process.env.NODE_ENV !== "production" ? (0, _warning.default)(!window.__FOUND_REPLACE_ROUTE_CONFIG__, 'Replacing existing hot reloading hook. Do not render more than ' + 'one router instance when using hot reloading.') : void 0;
          window.__FOUND_REPLACE_ROUTE_CONFIG__ = this.props.router.replaceRouteConfig;
        }
        /* eslint-enable no-underscore-dangle */

        /* eslint-env browser: false */

      }
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(nextProps.router === this.props.router, '<BaseRouter> does not support changing the router object.') : void 0;

      if (nextProps.match !== this.props.match || nextProps.resolver !== this.props.resolver || !(0, _isEqual.default)(nextProps.matchContext, this.props.matchContext)) {
        this.shouldResolveMatch = true;
      }
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      if (this.shouldResolveMatch) {
        this.shouldResolveMatch = false;
        this.resolveMatch();
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.mounted = false;

      if (process.env.NODE_ENV !== "production" && typeof window !== 'undefined') {
        /* eslint-env browser */

        /* eslint-disable no-underscore-dangle */
        if (window.__FOUND_HOT_RELOAD__) {
          delete window.__FOUND_REPLACE_ROUTE_CONFIG__;
        }
        /* eslint-enable no-underscore-dangle */

        /* eslint-env browser: false */

      }
    };

    _proto.resolveMatch =
    /*#__PURE__*/
    function () {
      var _resolveMatch = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var pendingMatch, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, renderArgs;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pendingMatch = this.props.match;
                _context.prev = 1;
                // ESLint doesn't handle for-await yet.
                // eslint-disable-next-line semi
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _context.prev = 4;
                _iterator = (0, _asyncIterator2.default)((0, _resolveRenderArgs.default)(this.props));

              case 6:
                _context.next = 8;
                return _iterator.next();

              case 8:
                _step = _context.sent;
                _iteratorNormalCompletion = _step.done;
                _context.next = 12;
                return _step.value;

              case 12:
                _value = _context.sent;

                if (_iteratorNormalCompletion) {
                  _context.next = 23;
                  break;
                }

                renderArgs = _value;

                if (!(!this.mounted || this.props.match !== pendingMatch)) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return");

              case 17:
                // If we're about to mark the match resolved, delay the rerender
                // until we do so.
                this.pendingResolvedMatch = !!((renderArgs.elements || renderArgs.error) && this.props.resolvedMatch !== pendingMatch);
                this.setState({
                  element: render(renderArgs)
                });

                if (this.pendingResolvedMatch) {
                  // If this is a new match, update the store, so we can rerender at
                  // the same time as all of the links and other components connected
                  // to the router state.
                  this.pendingResolvedMatch = false;
                  this.props.onResolveMatch(pendingMatch);
                }

              case 20:
                _iteratorNormalCompletion = true;
                _context.next = 6;
                break;

              case 23:
                _context.next = 29;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 29:
                _context.prev = 29;
                _context.prev = 30;

                if (!(!_iteratorNormalCompletion && _iterator.return != null)) {
                  _context.next = 34;
                  break;
                }

                _context.next = 34;
                return _iterator.return();

              case 34:
                _context.prev = 34;

                if (!_didIteratorError) {
                  _context.next = 37;
                  break;
                }

                throw _iteratorError;

              case 37:
                return _context.finish(34);

              case 38:
                return _context.finish(29);

              case 39:
                _context.next = 47;
                break;

              case 41:
                _context.prev = 41;
                _context.t1 = _context["catch"](1);

                if (!(_context.t1 instanceof _RedirectException.default)) {
                  _context.next = 46;
                  break;
                }

                this.props.router.replace(_context.t1.location);
                return _context.abrupt("return");

              case 46:
                throw _context.t1;

              case 47:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 41], [4, 25, 29, 39], [30,, 34, 38]]);
      }));

      return function resolveMatch() {
        return _resolveMatch.apply(this, arguments);
      };
    }();

    _proto.render = function render() {
      // Don't rerender synchronously if we have another rerender coming. Just
      // memoizing the element here doesn't do anything because we're using
      // context.
      return _react.default.createElement(_reactStaticContainer.default, {
        shouldUpdate: !this.shouldResolveMatch && !this.pendingResolvedMatch
      }, this.state.element);
    };

    return BaseRouter;
  }(_react.default.Component);

  BaseRouter.propTypes = propTypes;
  BaseRouter.childContextTypes = childContextTypes;
  return BaseRouter;
}