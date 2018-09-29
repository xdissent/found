"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var propTypes = {
  elements: _propTypes.default.arrayOf( // This should be an object of this same type, but recursive checks would
  // probably be too messy.
  _propTypes.default.object, _propTypes.default.element).isRequired
};

function accumulateElement(children, element) {
  if (!children) {
    return element;
  }

  if (!element) {
    return children;
  }

  if (!_react.default.isValidElement(children)) {
    // Children come from named child routes.
    var groups = {};
    Object.entries(children).forEach(function (_ref) {
      var groupName = _ref[0],
          groupElements = _ref[1];
      groups[groupName] = groupElements.reduceRight(accumulateElement, null);
    });
    return _react.default.cloneElement(element, groups);
  }

  return _react.default.cloneElement(element, {
    children: children
  });
}

function ElementsRenderer(_ref2) {
  var elements = _ref2.elements;
  return elements.reduceRight(accumulateElement, null);
}

ElementsRenderer.propTypes = propTypes;
var _default = ElementsRenderer;
exports.default = _default;