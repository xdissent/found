'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = createBaseRouter;

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStaticContainer = require('react-static-container');

var _reactStaticContainer2 = _interopRequireDefault(_reactStaticContainer);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _PropTypes = require('./PropTypes');

var _RedirectException = require('./RedirectException');

var _RedirectException2 = _interopRequireDefault(_RedirectException);

var _createRender = require('./createRender');

var _createRender2 = _interopRequireDefault(_createRender);

var _resolveRenderArgs = require('./utils/resolveRenderArgs');

var _resolveRenderArgs2 = _interopRequireDefault(_resolveRenderArgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createBaseRouter(_ref) {
  var render = _ref.render,
      renderPending = _ref.renderPending,
      renderReady = _ref.renderReady,
      renderError = _ref.renderError;

  // eslint-disable-next-line no-param-reassign
  render = render || (0, _createRender2.default)({
    renderPending: renderPending,
    renderReady: renderReady,
    renderError: renderError
  });

  var propTypes = {
    match: _propTypes2.default.object.isRequired,
    resolvedMatch: _propTypes2.default.object.isRequired,
    matchContext: _propTypes2.default.any,
    resolver: _propTypes2.default.shape({
      resolveElements: _propTypes2.default.func.isRequired
    }).isRequired,
    router: _PropTypes.routerShape.isRequired,
    onResolveMatch: _propTypes2.default.func.isRequired,
    initialRenderArgs: _propTypes2.default.object
  };

  var BaseRouter = function (_React$Component) {
    (0, _inherits3.default)(BaseRouter, _React$Component);

    function BaseRouter(props) {
      (0, _classCallCheck3.default)(this, BaseRouter);

      var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props));

      var initialRenderArgs = props.initialRenderArgs;


      _this.state = {
        element: initialRenderArgs ? render(initialRenderArgs) : null
      };

      _this.mounted = true;

      _this.shouldResolveMatch = false;
      _this.pendingResolvedMatch = false;
      return _this;
    }

    // We use componentDidMount and componentDidUpdate to resolve the match if
    // needed because element resolution is asynchronous anyway, and this lets
    // us not worry about setState not being available in the constructor, or
    // about having to pass around nextProps.

    BaseRouter.prototype.componentDidMount = function componentDidMount() {
      if (!this.props.initialRenderArgs) {
        this.resolveMatch();
      }

      if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
        /* eslint-env browser */
        /* eslint-disable no-underscore-dangle */
        if (window.__FOUND_HOT_RELOAD__) {
          process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!window.__FOUND_REPLACE_ROUTE_CONFIG__, 'Replacing existing hot reloading hook. Do not render more than ' + 'one router instance when using hot reloading.') : void 0;

          window.__FOUND_REPLACE_ROUTE_CONFIG__ = this.props.router.replaceRouteConfig;
        }
        /* eslint-enable no-underscore-dangle */
        /* eslint-env browser: false */
      }
    };

    BaseRouter.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(nextProps.router === this.props.router, '<BaseRouter> does not support changing the router object.') : void 0;

      if (nextProps.match !== this.props.match || nextProps.resolver !== this.props.resolver || !(0, _isEqual2.default)(nextProps.matchContext, this.props.matchContext)) {
        this.shouldResolveMatch = true;
      }
    };

    BaseRouter.prototype.componentDidUpdate = function componentDidUpdate() {
      if (this.shouldResolveMatch) {
        this.shouldResolveMatch = false;
        this.resolveMatch();
      }
    };

    BaseRouter.prototype.componentWillUnmount = function componentWillUnmount() {
      this.mounted = false;

      if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
        /* eslint-env browser */
        /* eslint-disable no-underscore-dangle */
        if (window.__FOUND_HOT_RELOAD__) {
          delete window.__FOUND_REPLACE_ROUTE_CONFIG__;
        }
        /* eslint-enable no-underscore-dangle */
        /* eslint-env browser: false */
      }
    };

    BaseRouter.prototype.resolveMatch = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var pendingMatch, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, renderArgs;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pendingMatch = this.props.match;
                _context.prev = 1;

                // ESLint doesn't handle for-await yet.
                // eslint-disable-next-line semi
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = (0, _asyncIterator3.default)((0, _resolveRenderArgs2.default)(this.props));

              case 7:
                _context.next = 9;
                return _iterator.next();

              case 9:
                _step = _context.sent;
                _iteratorNormalCompletion = _step.done;
                _context.next = 13;
                return _step.value;

              case 13:
                _value = _context.sent;

                if (_iteratorNormalCompletion) {
                  _context.next = 24;
                  break;
                }

                renderArgs = _value;

                if (!(!this.mounted || this.props.match !== pendingMatch)) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt('return');

              case 18:

                // If we're about to mark the match resolved, delay the rerender
                // until we do so.
                this.pendingResolvedMatch = !!((renderArgs.elements || renderArgs.error) && this.props.resolvedMatch !== pendingMatch);

                this.setState({ element: render(renderArgs) });

                if (this.pendingResolvedMatch) {
                  // If this is a new match, update the store, so we can rerender at
                  // the same time as all of the links and other components connected
                  // to the router state.
                  this.pendingResolvedMatch = false;
                  this.props.onResolveMatch(pendingMatch);
                }

              case 21:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 24:
                _context.next = 30;
                break;

              case 26:
                _context.prev = 26;
                _context.t0 = _context['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 30:
                _context.prev = 30;
                _context.prev = 31;

                if (!(!_iteratorNormalCompletion && _iterator.return)) {
                  _context.next = 35;
                  break;
                }

                _context.next = 35;
                return _iterator.return();

              case 35:
                _context.prev = 35;

                if (!_didIteratorError) {
                  _context.next = 38;
                  break;
                }

                throw _iteratorError;

              case 38:
                return _context.finish(35);

              case 39:
                return _context.finish(30);

              case 40:
                _context.next = 48;
                break;

              case 42:
                _context.prev = 42;
                _context.t1 = _context['catch'](1);

                if (!(_context.t1 instanceof _RedirectException2.default)) {
                  _context.next = 47;
                  break;
                }

                this.props.router.replace(_context.t1.location);
                return _context.abrupt('return');

              case 47:
                throw _context.t1;

              case 48:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 42], [5, 26, 30, 40], [31,, 35, 39]]);
      }));

      function resolveMatch() {
        return _ref2.apply(this, arguments);
      }

      return resolveMatch;
    }();

    BaseRouter.prototype.render = function render() {
      // Don't rerender synchronously if we have another rerender coming. Just
      // memoizing the element here doesn't do anything because we're using
      // context.
      return _react2.default.createElement(
        _reactStaticContainer2.default,
        {
          shouldUpdate: !this.shouldResolveMatch && !this.pendingResolvedMatch
        },
        this.state.element
      );
    };

    return BaseRouter;
  }(_react2.default.Component);

  BaseRouter.propTypes = propTypes;

  return BaseRouter;
}
module.exports = exports.default;