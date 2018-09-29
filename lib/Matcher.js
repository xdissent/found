"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _pathToRegexp = _interopRequireDefault(require("path-to-regexp"));

var _warning = _interopRequireDefault(require("warning"));

var Matcher =
/*#__PURE__*/
function () {
  function Matcher(routeConfig, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$matchStemRoutes = _ref.matchStemRoutes,
        matchStemRoutes = _ref$matchStemRoutes === void 0 ? true : _ref$matchStemRoutes;

    this.routeConfig = routeConfig;
    this.matchStemRoutes = matchStemRoutes; // Overly-aggressive deduplication of packages can lead to the wrong
    // version of path-to-regexp getting bundled. This is a common enough
    // failure mode that it's worthwhile to add a dev-only warning here.

    process.env.NODE_ENV !== "production" ? (0, _warning.default)(typeof _pathToRegexp.default.compile === 'function', 'Incorrect version of path-to-regexp imported. If this is running ' + 'from a client bundle, check your bundler settings.') : void 0;
  }

  var _proto = Matcher.prototype;

  _proto.match = function match(_ref2) {
    var pathname = _ref2.pathname;
    var matches = this.matchRoutes(this.routeConfig, pathname);

    if (!matches) {
      return null;
    }

    return this.makePayload(matches);
  };

  _proto.getRoutes = function getRoutes(_ref3) {
    var routeIndices = _ref3.routeIndices;

    if (!routeIndices) {
      return null;
    }

    return this.getRoutesFromIndices(routeIndices, this.routeConfig);
  };

  _proto.joinPaths = function joinPaths(basePath, path) {
    if (!path) {
      return basePath;
    }

    if (basePath.charAt(basePath.length - 1) === '/') {
      // eslint-disable-next-line no-param-reassign
      basePath = basePath.slice(0, -1);
    }

    return "" + basePath + this.getCanonicalPattern(path);
  };

  _proto.isActive = function isActive(_ref4, location, _temp2) {
    var matchLocation = _ref4.location;

    var _ref5 = _temp2 === void 0 ? {} : _temp2,
        exact = _ref5.exact;

    return this.isPathnameActive(matchLocation.pathname, location.pathname, exact) && this.isQueryActive(matchLocation.query, location.query);
  };

  _proto.format = function format(pattern, params) {
    return _pathToRegexp.default.compile(pattern)(params);
  };

  _proto.matchRoutes = function matchRoutes(routeConfig, pathname) {
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
            return [{
              index: index,
              params: params
            }].concat(childMatches);
          }
        } else {
          var groups = this.matchGroups(children, remaining);

          if (groups) {
            return [{
              index: index,
              params: params
            }, {
              groups: groups
            }];
          }
        }
      }

      if (!remaining) {
        if (this.matchStemRoutes || !children) {
          return [{
            index: index,
            params: params
          }];
        }
      }
    }

    return null;
  };

  _proto.matchRoute = function matchRoute(route, pathname) {
    var routePath = route.path;

    if (!routePath) {
      return {
        params: {},
        remaining: pathname
      };
    }

    var pattern = this.getCanonicalPattern(routePath);
    var keys = [];
    var regexp = (0, _pathToRegexp.default)(pattern, keys, {
      end: false
    });
    var match = regexp.exec(pathname);

    if (match === null) {
      return null;
    }

    var params = Object.create(null);
    keys.forEach(function (_ref6, index) {
      var name = _ref6.name;
      var value = match[index + 1];
      params[name] = value && decodeURIComponent(value);
    });
    return {
      params: params,
      remaining: pathname.slice(match[0].length)
    };
  };

  _proto.getCanonicalPattern = function getCanonicalPattern(pattern) {
    return pattern.charAt(0) === '/' ? pattern : "/" + pattern;
  };

  _proto.matchGroups = function matchGroups(routeGroups, pathname) {
    var groups = {};

    var _arr = Object.entries(routeGroups);

    for (var _i = 0; _i < _arr.length; _i++) {
      var _arr$_i = _arr[_i],
          groupName = _arr$_i[0],
          routes = _arr$_i[1];
      var groupMatch = this.matchRoutes(routes, pathname);

      if (!groupMatch) {
        return null;
      }

      groups[groupName] = groupMatch;
    }

    return groups;
  };

  _proto.makePayload = function makePayload(matches) {
    var _this = this;

    var routeMatch = matches[0];

    if (routeMatch.groups) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(matches.length === 1, 'Route match with groups %s has children, which are ignored.', Object.keys(routeMatch.groups).join(', ')) : void 0;
      var routeIndices = {};
      var routeParams = [];
      var _params = {};
      Object.entries(routeMatch.groups).forEach(function (_ref7) {
        var groupName = _ref7[0],
            groupMatches = _ref7[1];

        var groupPayload = _this.makePayload(groupMatches); // Retain the nested group structure for route indices so we can
        // reconstruct the element tree from flattened route elements.


        routeIndices[groupName] = groupPayload.routeIndices; // Flatten route groups for route params matching getRoutesFromIndices
        // below.

        routeParams.push.apply(routeParams, groupPayload.routeParams); // Just merge all the params depth-first; it's the easiest option.

        Object.assign(_params, groupPayload.params);
      });
      return {
        routeIndices: routeIndices,
        routeParams: routeParams,
        params: _params
      };
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
      params: (0, _extends2.default)({}, params, childPayload.params)
    };
  };

  _proto.getRoutesFromIndices = function getRoutesFromIndices(routeIndices, routeConfigOrGroups) {
    var _this2 = this;

    var routeIndex = routeIndices[0];

    if (typeof routeIndex === 'object') {
      // Flatten route groups to save resolvers from having to explicitly
      // handle them.
      var groupRoutes = [];
      Object.entries(routeIndex).forEach(function (_ref8) {
        var groupName = _ref8[0],
            groupRouteIndices = _ref8[1];
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

  _proto.isPathnameActive = function isPathnameActive(matchPathname, pathname, exact) {
    if (pathname === matchPathname) {
      return true;
    }

    if (exact) {
      // The above condition is necessary for an exact match.
      return false;
    } // Require that a partial match be followed by a path separator.


    var pathnameWithSeparator = pathname.slice(-1) !== '/' ? pathname + "/" : pathname; // Can't use startsWith, as that requires a polyfill.

    return matchPathname.indexOf(pathnameWithSeparator) === 0;
  };

  _proto.isQueryActive = function isQueryActive(matchQuery, query) {
    if (!query) {
      return true;
    }

    return Object.entries(query).every(function (_ref9) {
      var key = _ref9[0],
          value = _ref9[1];
      return Object.prototype.hasOwnProperty.call(matchQuery, key) ? (0, _isEqual.default)(matchQuery[key], value) : value === undefined;
    });
  };

  _proto.replaceRouteConfig = function replaceRouteConfig(routeConfig) {
    this.routeConfig = routeConfig;
  };

  return Matcher;
}();

exports.default = Matcher;