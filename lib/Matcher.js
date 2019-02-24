'use strict';

exports.__esModule = true;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Matcher = function () {
  function Matcher(routeConfig) {
    (0, _classCallCheck3.default)(this, Matcher);

    this.routeConfig = routeConfig;

    // Overly-aggressive deduplication of packages can lead to the wrong
    // version of path-to-regexp getting bundled. This is a common enough
    // failure mode that it's worthwhile to add a dev-only warning here.
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(typeof _pathToRegexp2.default.compile === 'function', 'Incorrect version of path-to-regexp imported. If this is running ' + 'from a client bundle, check your bundler settings.') : void 0;
  }

  Matcher.prototype.match = function match(_ref) {
    var pathname = _ref.pathname;

    var matches = this.matchRoutes(this.routeConfig, pathname);
    if (!matches) {
      return null;
    }

    return this.makePayload(matches);
  };

  Matcher.prototype.getRoutes = function getRoutes(_ref2) {
    var routeIndices = _ref2.routeIndices;

    if (!routeIndices) {
      return null;
    }

    return this.getRoutesFromIndices(routeIndices, this.routeConfig);
  };

  Matcher.prototype.joinPaths = function joinPaths(basePath, path) {
    if (!path) {
      return basePath;
    }

    if (basePath.charAt(basePath.length - 1) === '/') {
      // eslint-disable-next-line no-param-reassign
      basePath = basePath.slice(0, -1);
    }

    return '' + basePath + this.getCanonicalPattern(path);
  };

  Matcher.prototype.isActive = function isActive(_ref3, location) {
    var matchLocation = _ref3.location;

    var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        exact = _ref4.exact;

    return this.isPathnameActive(matchLocation.pathname, location.pathname, exact) && this.isQueryActive(matchLocation.query, location.query);
  };

  Matcher.prototype.format = function format(pattern, params) {
    return _pathToRegexp2.default.compile(pattern)(params);
  };

  Matcher.prototype.matchRoutes = function matchRoutes(routeConfig, pathname) {
    for (var index = 0; index < routeConfig.length; ++index) {
      var route = routeConfig[index];

      var match = this.matchRoute(route, pathname);
      if (!match) {
        continue; // eslint-disable-line no-continue
      }

      var params = match.params,
          remaining = match.remaining;
      var children = route.children;


      if (children) {
        if (Array.isArray(children)) {
          var childMatches = this.matchRoutes(children, remaining);
          if (childMatches) {
            return [{ index: index, params: params }].concat(childMatches);
          }
        } else {
          var groups = this.matchGroups(children, remaining);
          if (groups) {
            return [{ index: index, params: params }, { groups: groups }];
          }
        }
      }

      if (!remaining && !children) {
        return [{ index: index, params: params }];
      }
    }

    return null;
  };

  Matcher.prototype.matchRoute = function matchRoute(route, pathname) {
    var routePath = route.path;
    if (!routePath) {
      return {
        params: {},
        remaining: pathname
      };
    }

    var pattern = this.getCanonicalPattern(routePath);
    var keys = [];
    var regexp = (0, _pathToRegexp2.default)(pattern, keys, { end: false });

    var match = regexp.exec(pathname);
    if (match === null) {
      return null;
    }

    var params = (0, _create2.default)(null);
    keys.forEach(function (_ref5, index) {
      var name = _ref5.name;

      var value = match[index + 1];
      params[name] = value && decodeURIComponent(value);
    });

    return {
      params: params,
      remaining: pathname.slice(match[0].length)
    };
  };

  Matcher.prototype.getCanonicalPattern = function getCanonicalPattern(pattern) {
    return pattern.charAt(0) === '/' ? pattern : '/' + pattern;
  };

  Matcher.prototype.matchGroups = function matchGroups(routeGroups, pathname) {
    var groups = {};

    for (var _iterator = (0, _entries2.default)(routeGroups), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref7;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref7 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref7 = _i.value;
      }

      var _ref6 = _ref7;
      var groupName = _ref6[0];
      var routes = _ref6[1];

      var groupMatch = this.matchRoutes(routes, pathname);
      if (!groupMatch) {
        return null;
      }

      groups[groupName] = groupMatch;
    }

    return groups;
  };

  Matcher.prototype.makePayload = function makePayload(matches) {
    var _this = this;

    var routeMatch = matches[0];

    if (routeMatch.groups) {
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(matches.length === 1, 'Route match with groups %s has children, which are ignored.', (0, _keys2.default)(routeMatch.groups).join(', ')) : void 0;

      var routeIndices = {};
      var routeParams = [];
      var _params = {};

      (0, _entries2.default)(routeMatch.groups).forEach(function (_ref8) {
        var groupName = _ref8[0],
            groupMatches = _ref8[1];

        var groupPayload = _this.makePayload(groupMatches);

        // Retain the nested group structure for route indices so we can
        // reconstruct the element tree from flattened route elements.
        routeIndices[groupName] = groupPayload.routeIndices;

        // Flatten route groups for route params matching getRoutesFromIndices
        // below.
        routeParams.push.apply(routeParams, groupPayload.routeParams);

        // Just merge all the params depth-first; it's the easiest option.
        (0, _assign2.default)(_params, groupPayload.params);
      });

      return { routeIndices: routeIndices, routeParams: routeParams, params: _params };
    }

    var index = routeMatch.index,
        params = routeMatch.params;


    if (matches.length === 1) {
      return {
        routeIndices: [index],
        routeParams: [params],
        params: params
      };
    }

    var childPayload = this.makePayload(matches.slice(1));
    return {
      routeIndices: [index].concat(childPayload.routeIndices),
      routeParams: [params].concat(childPayload.routeParams),
      params: (0, _extends3.default)({}, params, childPayload.params)
    };
  };

  Matcher.prototype.getRoutesFromIndices = function getRoutesFromIndices(routeIndices, routeConfigOrGroups) {
    var _this2 = this;

    var routeIndex = routeIndices[0];

    if ((typeof routeIndex === 'undefined' ? 'undefined' : (0, _typeof3.default)(routeIndex)) === 'object') {
      // Flatten route groups to save resolvers from having to explicitly
      // handle them.
      var groupRoutes = [];
      (0, _entries2.default)(routeIndex).forEach(function (_ref9) {
        var groupName = _ref9[0],
            groupRouteIndices = _ref9[1];

        groupRoutes.push.apply(groupRoutes, _this2.getRoutesFromIndices(groupRouteIndices, routeConfigOrGroups[groupName]));
      });

      return groupRoutes;
    }

    var route = routeConfigOrGroups[routeIndex];

    if (routeIndices.length === 1) {
      return [route];
    }

    return [route].concat(this.getRoutesFromIndices(routeIndices.slice(1), route.children));
  };

  Matcher.prototype.isPathnameActive = function isPathnameActive(matchPathname, pathname, exact) {
    if (pathname === matchPathname) {
      return true;
    }

    if (exact) {
      // The above condition is necessary for an exact match.
      return false;
    }

    // Require that a partial match be followed by a path separator.
    var pathnameWithSeparator = pathname.slice(-1) !== '/' ? pathname + '/' : pathname;

    // Can't use startsWith, as that requires a polyfill.
    return matchPathname.indexOf(pathnameWithSeparator) === 0;
  };

  Matcher.prototype.isQueryActive = function isQueryActive(matchQuery, query) {
    if (!query) {
      return true;
    }

    return (0, _entries2.default)(query).every(function (_ref10) {
      var key = _ref10[0],
          value = _ref10[1];
      return Object.prototype.hasOwnProperty.call(matchQuery, key) ? (0, _isEqual2.default)(matchQuery[key], value) : value === undefined;
    });
  };

  Matcher.prototype.replaceRouteConfig = function replaceRouteConfig(routeConfig) {
    this.routeConfig = routeConfig;
  };

  return Matcher;
}();

exports.default = Matcher;
module.exports = exports.default;