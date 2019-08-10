"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _route = _interopRequireDefault(require("./routes/route"));

var _swagger = _interopRequireDefault(require("../api/docs/swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_route.default);
app.use('/api/v1/docs', _swaggerUiExpress.default.serve);
app.get('/api/v1/docs', _swaggerUiExpress.default.setup(_swagger.default));
const port = process.env.PORT || 3000; // eslint-disable-next-line no-console

app.listen(port, () => console.info(`Server running on port ${port}...`));
var _default = app;
exports.default = _default;