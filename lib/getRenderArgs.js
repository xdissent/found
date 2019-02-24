'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncIterator2 = require('babel-runtime/helpers/asyncIterator');

var _asyncIterator3 = _interopRequireDefault(_asyncIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _resolveRenderArgs = require('./utils/resolveRenderArgs');

var _resolveRenderArgs2 = _interopRequireDefault(_resolveRenderArgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
    var elements, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            elements = void 0;

            // ESLint doesn't handle for-await yet.
            // eslint-disable-next-line semi

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = (0, _asyncIterator3.default)((0, _resolveRenderArgs2.default)(props));

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
              _context.next = 18;
              break;
            }

            elements = _value;

          case 15:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context['catch'](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!(!_iteratorNormalCompletion && _iterator.return)) {
              _context.next = 29;
              break;
            }

            _context.next = 29;
            return _iterator.return();

          case 29:
            _context.prev = 29;

            if (!_didIteratorError) {
              _context.next = 32;
              break;
            }

            throw _iteratorError;

          case 32:
            return _context.finish(29);

          case 33:
            return _context.finish(24);

          case 34:
            return _context.abrupt('return', elements);

          case 35:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 20, 24, 34], [25,, 29, 33]]);
  }));

  function getRenderArgs(_x) {
    return _ref.apply(this, arguments);
  }

  return getRenderArgs;
}();

module.exports = exports.default;