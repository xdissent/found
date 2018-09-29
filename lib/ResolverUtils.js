"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.checkResolved = checkResolved;
exports.isResolved = isResolved;
exports.accumulateRouteValues = accumulateRouteValues;
exports.getRouteMatches = getRouteMatches;
exports.getRouteValue = getRouteValue;
exports.getRouteValues = getRouteValues;
exports.getComponents = getComponents;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isPromise = _interopRequireDefault(require("is-promise"));

var _warning = _interopRequireDefault(require("warning"));

var UNRESOLVED = {};

function checkResolved(value) {
  if (!(0, _isPromise.default)(value)) {
    return value;
  }

  return Promise.race([value, new Promise(function (resolve) {
    setImmediate(resolve, UNRESOLVED);
  })]);
}

function isResolved(value) {
  return value !== UNRESOLVED;
}

function accumulateRouteValuesImpl(routeValues, routeIndices, callback, initialValue) {
  var accumulated = [];
  var value = initialValue;

  for (var _iterator = routeIndices, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

    if (typeof routeIndex === 'object') {
      // eslint-disable-next-line no-loop-func
      Object.values(routeIndex).forEach(function (groupRouteIndices) {
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
  return accumulateRouteValuesImpl(routeValues.concat(), routeIndices, callback, initialValue);
}

function getRouteMatches(match) {
  return match.routes.map(function (route, i) {
    return (0, _extends2.default)({}, match, {
      route: route,
      routeParams: match.routeParams[i]
    });
  });
}

function getRouteValue(match, getGetter, getValue) {
  var route = match.route;
  var getter = getGetter(route);
  return getter ? getter.call(route, match) : getValue(route);
} // This is a little more versatile than if we only passed in keys.


function getRouteValues(routeMatches, getGetter, getValue) {
  return routeMatches.map(function (match) {
    return getRouteValue(match, getGetter, getValue);
  });
}

function getRouteGetComponent(route) {
  return route.getComponent;
}

function getRouteComponent(route) {
  if (process.env.NODE_ENV !== "production" && route.component) {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(route.Component, 'Route with `component` property `%s` has no `Component` ' + 'property. The expected property for the route component ' + 'is `Component`.', route.component.displayName || route.component.name) : void 0;
  }

  return route.Component;
} // This should be common to most resolvers, so make it available here.


function getComponents(routeMatches) {
  return getRouteValues(routeMatches, getRouteGetComponent, getRouteComponent);
}