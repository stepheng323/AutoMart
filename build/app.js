"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _route = _interopRequireDefault(require("./routes/route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_route["default"]);
var port = process.env.PORT || 3000; // eslint-disable-next-line no-console

app.listen(port, function () {
  return console.log("Server running on port ".concat(port, "..."));
});
var _default = app;
exports["default"] = _default;