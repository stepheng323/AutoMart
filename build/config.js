"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = _interopRequireDefault(require("pg"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config;

_dotenv["default"].config();

var production = {
  host: process.env.HEROKU_PG_HOST,
  user: process.env.HEROKU_PG_USER,
  database: process.env.HEROKU_PG_DATABASE,
  password: process.env.HEROKU_PG_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000
};
var development = {
  user: process.env.DB_USER,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000
};

if (process.env.NODE_ENV === 'production') {
  config = production;
} else {
  config = development;
}

var pool = new _pg["default"].Pool(config);
pool.on('connect', function () {
  console.log('connected to the database');
});
var _default = pool;
exports["default"] = _default;