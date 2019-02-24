'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _HttpError = require('../HttpError');

var _HttpError2 = _interopRequireDefault(_HttpError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function foldElements(elementsRaw, routeIndices) {
  var elements = [];

  for (var _iterator = routeIndices, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var routeIndex = _ref;

    if ((typeof routeIndex === 'undefined' ? 'undefined' : (0, _typeof3.default)(routeIndex)) === 'object') {
      (function () {
        // Reshape the next elements in the elements array to match the nested
        // tree structure corresponding to the route groups.
        var groupElements = {};
        (0, _entries2.default)(routeIndex).forEach(function (_ref2) {
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

exports.default = function () {
  var _ref3 = _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref4) {
    var router = _ref4.router,
        match = _ref4.match,
        matchContext = _ref4.matchContext,
        resolver = _ref4.resolver;

    var routes, augmentedMatch, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator2, _step, _value, elements;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            routes = router.matcher.getRoutes(match);
            augmentedMatch = (0, _extends3.default)({}, match, {
              routes: routes,
              router: router, // Convenience access for route components.
              context: matchContext
            });

            if (routes) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return (0, _extends3.default)({}, augmentedMatch, { error: new _HttpError2.default(404) });

          case 5:
            return _context.abrupt('return');

          case 6:
            _context.prev = 6;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 10;
            _iterator2 = (0, _asyncIterator3.default)(resolver.resolveElements(augmentedMatch));

          case 12:
            _context.next = 14;
            return _asyncGenerator3.default.await(_iterator2.next());

          case 14:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 18;
            return _asyncGenerator3.default.await(_step.value);

          case 18:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 26;
              break;
            }

            elements = _value;
            _context.next = 23;
            return (0, _extends3.default)({}, augmentedMatch, {
              elements: elements && foldElements([].concat(elements), match.routeIndices)
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
            _context.t0 = _context['catch'](10);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 32:
            _context.prev = 32;
            _context.prev = 33;

            if (!(!_iteratorNormalCompletion && _iterator2.return)) {
              _context.next = 37;
              break;
            }

            _context.next = 37;
            return _asyncGenerator3.default.await(_iterator2.return());

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
            _context.t1 = _context['catch'](6);

            if (!(_context.t1 instanceof _HttpError2.default)) {
              _context.next = 50;
              break;
            }

            _context.next = 49;
            return (0, _extends3.default)({}, augmentedMatch, { error: _context.t1 });

          case 49:
            return _context.abrupt('return');

          case 50:
            throw _context.t1;

          case 51:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[6, 44], [10, 28, 32, 42], [33,, 37, 41]]);
  }));

  function resolveRenderArgs(_x) {
    return _ref3.apply(this, arguments);
  }

  return resolveRenderArgs;
}();

module.exports = exports.default;