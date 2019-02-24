'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncGenerator2 = require('babel-runtime/helpers/asyncGenerator');

var _asyncGenerator3 = _interopRequireDefault(_asyncGenerator2);

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

var _createElements = require('./createElements');

var _createElements2 = _interopRequireDefault(_createElements);

var _ResolverUtils = require('./ResolverUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRouteGetData(route) {
  return route.getData;
}

function getRouteData(route) {
  return route.data;
}

exports.default = {
  resolveElements: function resolveElements(match) {
    var _this = this;

    return _asyncGenerator3.default.wrap( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var routeMatches, Components, data, earlyComponents, earlyData, fetchedComponents, fetchedData, pendingElements;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              routeMatches = (0, _ResolverUtils.getRouteMatches)(match);
              Components = (0, _ResolverUtils.getComponents)(routeMatches);
              data = _this.getData(match, routeMatches);

              if (!Components.some(_isPromise2.default)) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return _asyncGenerator3.default.await(_promise2.default.all(Components.map(_ResolverUtils.checkResolved)));

            case 6:
              _context.t0 = _context.sent;
              _context.next = 10;
              break;

            case 9:
              _context.t0 = Components;

            case 10:
              earlyComponents = _context.t0;

              if (!data.some(_isPromise2.default)) {
                _context.next = 17;
                break;
              }

              _context.next = 14;
              return _asyncGenerator3.default.await(_promise2.default.all(data.map(_ResolverUtils.checkResolved)));

            case 14:
              _context.t1 = _context.sent;
              _context.next = 18;
              break;

            case 17:
              _context.t1 = data;

            case 18:
              earlyData = _context.t1;
              fetchedComponents = void 0;
              fetchedData = void 0;

              if (!(!earlyComponents.every(_ResolverUtils.isResolved) || !earlyData.every(_ResolverUtils.isResolved))) {
                _context.next = 33;
                break;
              }

              pendingElements = (0, _createElements2.default)(routeMatches, earlyComponents, earlyData);
              _context.next = 25;
              return pendingElements.every(function (element) {
                return element !== undefined;
              }) ? pendingElements : undefined;

            case 25:
              _context.next = 27;
              return _asyncGenerator3.default.await(_promise2.default.all(Components));

            case 27:
              fetchedComponents = _context.sent;
              _context.next = 30;
              return _asyncGenerator3.default.await(_promise2.default.all(data));

            case 30:
              fetchedData = _context.sent;
              _context.next = 35;
              break;

            case 33:
              fetchedComponents = earlyComponents;
              fetchedData = earlyData;

            case 35:
              _context.next = 37;
              return (0, _createElements2.default)(routeMatches, fetchedComponents, fetchedData);

            case 37:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },


  /**
   * Generate route data according to their getters, respecting the order of
   * promises per the `defer` flag on routes.
   */
  getData: function getData(match, routeMatches) {
    return (0, _ResolverUtils.accumulateRouteValues)(routeMatches, match.routeIndices, function (_ref, routeMatch) {
      var ancestorRouteData = _ref.ancestorRouteData,
          prevParentPromise = _ref.prevParentPromise;

      // For a deferred route, the parent promise is the previous promise.
      // Otherwise, it's the previous parent promise.
      var parentPromise = routeMatch.route.defer ? _promise2.default.all(ancestorRouteData) : prevParentPromise;

      // If there is a parent promise, execute after it resolves.
      var routeData = parentPromise ? parentPromise.then(function () {
        return (0, _ResolverUtils.getRouteValue)(routeMatch, getRouteGetData, getRouteData);
      }) : (0, _ResolverUtils.getRouteValue)(routeMatch, getRouteGetData, getRouteData);

      return {
        routeData: routeData,
        ancestorRouteData: [].concat(ancestorRouteData, [routeData]),
        prevParentPromise: parentPromise
      };
    }, {
      routeData: null,
      ancestorRouteData: [],
      prevParentPromise: null
    }).map(function (_ref2) {
      var routeData = _ref2.routeData;
      return routeData;
    });
  }
};
module.exports = exports.default;