"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getRenderArgs;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _asyncIterator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncIterator"));

var _resolveRenderArgs = _interopRequireDefault(require("./utils/resolveRenderArgs"));

function getRenderArgs(_x) {
  return _getRenderArgs.apply(this, arguments);
}

function _getRenderArgs() {
  _getRenderArgs = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(props) {
    var elements, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // ESLint doesn't handle for-await yet.
            // eslint-disable-next-line semi
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 2;
            _iterator = (0, _asyncIterator2.default)((0, _resolveRenderArgs.default)(props));

          case 4:
            _context.next = 6;
            return _iterator.next();

          case 6:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 10;
            return _step.value;

          case 10:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 16;
              break;
            }

            elements = _value;

          case 13:
            _iteratorNormalCompletion = true;
            _context.next = 4;
            break;

          case 16:
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](2);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 22:
            _context.prev = 22;
            _context.prev = 23;

            if (!(!_iteratorNormalCompletion && _iterator.return != null)) {
              _context.next = 27;
              break;
            }

            _context.next = 27;
            return _iterator.return();

          case 27:
            _context.prev = 27;

            if (!_didIteratorError) {
              _context.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context.finish(27);

          case 31:
            return _context.finish(22);

          case 32:
            return _context.abrupt("return", elements);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 18, 22, 32], [23,, 27, 31]]);
  }));
  return _getRenderArgs.apply(this, arguments);
}