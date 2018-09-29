"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _awaitAsyncGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/awaitAsyncGenerator"));

var _wrapAsyncGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapAsyncGenerator"));

var _isPromise = _interopRequireDefault(require("is-promise"));

var _createElements = _interopRequireDefault(require("./createElements"));

var _ResolverUtils = require("./ResolverUtils");

function getRouteGetData(route) {
  return route.getData;
}

function getRouteData(route) {
  return route.data;
}

var _default = {
  resolveElements: function resolveElements(match) {
    var _this = this;

    return (0, _wrapAsyncGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var routeMatches, Components, data, earlyComponents, earlyData, fetchedComponents, fetchedData, pendingElements;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              routeMatches = (0, _ResolverUtils.getRouteMatches)(match);
              Components = (0, _ResolverUtils.getComponents)(routeMatches);
              data = _this.getData(match, routeMatches);

              if (!Components.some(_isPromise.default)) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return (0, _awaitAsyncGenerator2.default)(Promise.all(Components.map(_ResolverUtils.checkResolved)));

            case 6:
              _context.t0 = _context.sent;
              _context.next = 10;
              break;

            case 9:
              _context.t0 = Components;

            case 10:
              earlyComponents = _context.t0;

              if (!data.some(_isPromise.default)) {
                _context.next = 17;
                break;
              }

              _context.next = 14;
              return (0, _awaitAsyncGenerator2.default)(Promise.all(data.map(_ResolverUtils.checkResolved)));

            case 14:
              _context.t1 = _context.sent;
              _context.next = 18;
              break;

            case 17:
              _context.t1 = data;

            case 18:
              earlyData = _context.t1;

              if (!(!earlyComponents.every(_ResolverUtils.isResolved) || !earlyData.every(_ResolverUtils.isResolved))) {
                _context.next = 31;
                break;
              }

              pendingElements = (0, _createElements.default)(routeMatches, earlyComponents, earlyData);
              _context.next = 23;
              return pendingElements.every(function (element) {
                return element !== undefined;
              }) ? pendingElements : undefined;

            case 23:
              _context.next = 25;
              return (0, _awaitAsyncGenerator2.default)(Promise.all(Components));

            case 25:
              fetchedComponents = _context.sent;
              _context.next = 28;
              return (0, _awaitAsyncGenerator2.default)(Promise.all(data));

            case 28:
              fetchedData = _context.sent;
              _context.next = 33;
              break;

            case 31:
              fetchedComponents = earlyComponents;
              fetchedData = earlyData;

            case 33:
              _context.next = 35;
              return (0, _createElements.default)(routeMatches, fetchedComponents, fetchedData);

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
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
      var parentPromise = routeMatch.route.defer ? Promise.all(ancestorRouteData) : prevParentPromise; // If there is a parent promise, execute after it resolves.

      var routeData = parentPromise ? parentPromise.then(function () {
        return (0, _ResolverUtils.getRouteValue)(routeMatch, getRouteGetData, getRouteData);
      }) : (0, _ResolverUtils.getRouteValue)(routeMatch, getRouteGetData, getRouteData);
      return {
        routeData: routeData,
        ancestorRouteData: ancestorRouteData.concat([routeData]),
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
exports.default = _default;