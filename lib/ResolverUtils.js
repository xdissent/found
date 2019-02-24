'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.checkResolved = checkResolved;
exports.isResolved = isResolved;
exports.accumulateRouteValues = accumulateRouteValues;
exports.getRouteMatches = getRouteMatches;
exports.getRouteValue = getRouteValue;
exports.getRouteValues = getRouteValues;
exports.getComponents = getComponents;

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UNRESOLVED = {};

function checkResolved(value) {
  if (!(0, _isPromise2.default)(value)) {
    return value;
  }

  return _promise2.default.race([value, new _promise2.default(function (resolve) {
    (0, _setImmediate3.default)(resolve, UNRESOLVED);
  })]);
}

function isResolved(value) {
  return value !== UNRESOLVED;
}

function accumulateRouteValuesImpl(routeValues, routeIndices, callback, initialValue) {
  var accumulated = [];
  var value = initialValue;

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
      // eslint-disable-next-line no-loop-func
      (0, _values2.default)(routeIndex).forEach(function (groupRouteIndices) {
        accumulated.push.apply(accumulated, accumulateRouteValuesImpl(routeValues, groupRouteIndices, callback, value));
      });
    } else {
      value = callback(value, routeValues.shift());
      accumulated.push(value);
    }
  }

  return accumulated;
}

function accumulateRouteValues(routeValues, routeIndices, callback, initialValue) {
  return accumulateRouteValuesImpl([].concat(routeValues), routeIndices, callback, initialValue);
}

function getRouteMatches(match) {
  return match.routes.map(function (route, i) {
    return (0, _extends3.default)({}, match, {
      route: route,
      routeParams: match.routeParams[i]
    });
  });
}

function getRouteValue(match, getGetter, getValue) {
  var route = match.route;

  var getter = getGetter(route);
  return getter ? getter.call(route, match) : getValue(route);
}

// This is a little more versatile than if we only passed in keys.
function getRouteValues(routeMatches, getGetter, getValue) {
  return routeMatches.map(function (match) {
    return getRouteValue(match, getGetter, getValue);
  });
}

function getRouteGetComponent(route) {
  return route.getComponent;
}

function getRouteComponent(route) {
  if (process.env.NODE_ENV !== 'production' && route.component) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(route.Component, 'Route with `component` property `%s` has no `Component` ' + 'property. The expected property for the route component ' + 'is `Component`.', route.component.displayName || route.component.name) : void 0;
  }

  return route.Component;
}

// This should be common to most resolvers, so make it available here.
function getComponents(routeMatches) {
  return getRouteValues(routeMatches, getRouteGetComponent, getRouteComponent);
}