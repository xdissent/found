'use strict';

exports.__esModule = true;

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = injectRouterProp;

var _createStoreRouterObject = require('./createStoreRouterObject');

var _createStoreRouterObject2 = _interopRequireDefault(_createStoreRouterObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_PATCHED = (0, _symbol2.default)('found.is_patched');
var ROUTER = (0, _symbol2.default)('found.router');

// FIXME: This is a terrible hack. Find a better way to do this.
function injectRouterProp(ConnectedComponent) {
  var baseRender = ConnectedComponent.prototype.render;

  function wrapSelectDerivedProps(baseSelectDerivedProps) {
    return function selectDerivedProps(state, props, store, selectorFactoryOptions) {
      var derivedProps = baseSelectDerivedProps(state, props, store, selectorFactoryOptions);

      if (!store[ROUTER]) {
        // Memoize the store router object.
        // eslint-disable-next-line no-param-reassign
        store[ROUTER] = (0, _createStoreRouterObject2.default)(store);
      }

      // Intentionally preserve the same derived props object, as the identity
      // of the router object should not change unless the store changes.
      derivedProps.router = store[ROUTER];

      return derivedProps;
    };
  }

  function render() {
    if (!this[IS_PATCHED]) {
      this.selectDerivedProps = wrapSelectDerivedProps(this.selectDerivedProps);
      this[IS_PATCHED] = true;
    }

    return baseRender.call(this);
  }

  // eslint-disable-next-line no-param-reassign
  ConnectedComponent.prototype.render = render;

  return ConnectedComponent;
}
module.exports = exports.default;