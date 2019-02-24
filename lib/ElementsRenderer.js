'use strict';

exports.__esModule = true;

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  elements: _propTypes2.default.arrayOf(
  // This should be an object of this same type, but recursive checks would
  // probably be too messy.
  _propTypes2.default.object, _propTypes2.default.element).isRequired
};

function accumulateElement(children, element) {
  if (!children) {
    return element;
  }

  if (!element) {
    return children;
  }

  if (!_react2.default.isValidElement(children)) {
    // Children come from named child routes.
    var groups = {};
    (0, _entries2.default)(children).forEach(function (_ref) {
      var groupName = _ref[0],
          groupElements = _ref[1];

      groups[groupName] = groupElements.reduceRight(accumulateElement, null);
    });

    return _react2.default.cloneElement(element, groups);
  }

  return _react2.default.cloneElement(element, { children: children });
}

function ElementsRenderer(_ref2) {
  var elements = _ref2.elements;

  return elements.reduceRight(accumulateElement, null);
}

ElementsRenderer.propTypes = propTypes;

exports.default = ElementsRenderer;
module.exports = exports.default;