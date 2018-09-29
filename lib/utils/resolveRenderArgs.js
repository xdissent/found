"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = resolveRenderArgs;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _awaitAsyncGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/awaitAsyncGenerator"));

var _wrapAsyncGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapAsyncGenerator"));

var _asyncIterator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncIterator"));

var _HttpError = _interopRequireDefault(require("../HttpError"));

function foldElements(elementsRaw, routeIndices) {
  var elements = [];

  for (var _iterator2 = routeIndices, _isArray = Array.isArray(_iterator2), _i = 0, _iterator2 = _isArray ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator2.length) break;
      _ref = _iterator2[_i++];
    } else {
      _i = _iterator2.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var routeIndex = _ref;

    if (typeof routeIndex === 'object') {
      (function () {
        // Reshape the next elements in the elements array to match the nested
        // tree structure corresponding to the route groups.
        var groupElements = {};
        Object.entries(routeIndex).forEach(function (_ref2) {
          var groupName = _ref2[0],
              groupRouteIndices = _ref2[1];
          groupElements[groupName] = foldElements(elementsRaw, groupRouteIndices);
        });
        elements.push(groupElements);
      })();
    } else {
      // We intentionally modify elementsRaw, to make it easier to recursively
      // handle groups.
      elements.push(elementsRaw.shift());
    }
  }

  return elements;
}

function resolveRenderArgs(_x) {
  return _resolveRenderArgs.apply(this, arguments);
}

function _resolveRenderArgs() {
  _resolveRenderArgs = (0, _wrapAsyncGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref3) {
    var router, match, matchContext, resolver, routes, augmentedMatch, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, elements;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            router = _ref3.router, match = _ref3.match, matchContext = _ref3.matchContext, resolver = _ref3.resolver;
            routes = router.matcher.getRoutes(match);
            augmentedMatch = (0, _extends2.default)({}, match, {
              routes: routes,
              match: match,
              // For symmetry with withRouter.
              router: router,
              // Convenience access for route components.
              context: matchContext
            });

            if (routes) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return (0, _extends2.default)({}, augmentedMatch, {
              error: new _HttpError.default(404)
            });

          case 6:
            return _context.abrupt("return");

          case 7:
            _context.prev = 7;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 10;
            _iterator = (0, _asyncIterator2.default)(resolver.resolveElements(augmentedMatch));

          case 12:
            _context.next = 14;
            return (0, _awaitAsyncGenerator2.default)(_iterator.next());

          case 14:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 18;
            return (0, _awaitAsyncGenerator2.default)(_step.value);

          case 18:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 26;
              break;
            }

            elements = _value;
            _context.next = 23;
            return (0, _extends2.default)({}, augmentedMatch, {
              elements: elements && foldElements(elements.concat(), match.routeIndices)
            });

          case 23:
            _iteratorNormalCompletion = true;
            _context.next = 12;
            break;

          case 26:
            _context.next = 32;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](10);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 32:
            _context.prev = 32;
            _context.prev = 33;

            if (!(!_iteratorNormalCompletion && _iterator.return != null)) {
              _context.next = 37;
              break;
            }

            _context.next = 37;
            return (0, _awaitAsyncGenerator2.default)(_iterator.return());

          case 37:
            _context.prev = 37;

            if (!_didIteratorError) {
              _context.next = 40;
              break;
            }

            throw _iteratorError;

          case 40:
            return _context.finish(37);

          case 41:
            return _context.finish(32);

          case 42:
            _context.next = 51;
            break;

          case 44:
            _context.prev = 44;
            _context.t1 = _context["catch"](7);

            if (!(_context.t1 instanceof _HttpError.default)) {
              _context.next = 50;
              break;
            }

            _context.next = 49;
            return (0, _extends2.default)({}, augmentedMatch, {
              error: _context.t1
            });

          case 49:
            return _context.abrupt("return");

          case 50:
            throw _context.t1;

          case 51:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 44], [10, 28, 32, 42], [33,, 37, 41]]);
  }));
  return _resolveRenderArgs.apply(this, arguments);
}