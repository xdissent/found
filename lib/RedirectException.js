"use strict";

exports.__esModule = true;
exports.default = void 0;

// This isn't really an error.
var RedirectException = function RedirectException(location) {
  this.location = location;
};

exports.default = RedirectException;