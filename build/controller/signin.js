"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _pg = _interopRequireDefault(require("pg"));

var _users = require("../model/users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Signin =
/*#__PURE__*/
function () {
  function Signin() {
    _classCallCheck(this, Signin);
  }

  _createClass(Signin, [{
    key: "signIn",
    value: function signIn(req, res) {
      var result = _joi["default"].validate(req.body, _users.signinSchema);

      if (result.error) {
        res.status(400).json({
          status: 400,
          error: result.error.details[0].message
        });
        return;
      }

      var config = {
        user: 'abiodun' || 'owxxiojqpvmffq',
        database: process.env.DATABASE || 'd7k5b8u2k7s9rp',
        password: process.env.PASSWORD || '849b56cbbb20121dc14ee194301797bbfec60cfbbe16e20dd5a028ed6e90c667',
        port: process.env.DB_PORT,
        max: 10,
        idleTimeoutMillis: 30000
      };
      var pool = new _pg["default"].Pool(config);
      pool.on('connect', function () {
        // eslint-disable-next-line no-console
        console.log('connected to the Database');
      });
      pool.connect(function (err, client, done) {
        if (err) {
          res.status(500).json({
            status: 500,
            error: 'could not connect to the pool'
          });
          return;
        }

        var query = 'SELECT * FROM users WHERE email = $1';
        var value = [req.body.email];
        client.query(query, value, function (queryError, queryResult) {
          done();

          if (queryError) {
            res.status(400).json({
              status: 400,
              error: queryError
            });
            return;
          }

          var user = queryResult.rows[0];

          if (!user) {
            res.status(400).json({
              status: 400,
              error: 'invalid email or address'
            });
          }

          if (queryResult.rows[0]) {
            _bcrypt["default"].compare(req.body.password, user.password, function (bcryptErr, correct) {
              if (bcryptErr) {
                res.status(401).json({
                  status: 401,
                  message: 'invalid email or password'
                });
                return;
              }

              if (correct) {
                var token = _jsonwebtoken["default"].sign({
                  email: user.email,
                  id: user.id
                }, process.env.TOKEN_SECRET, {
                  expiresIn: '1hr'
                });

                res.status(200).json({
                  status: 200,
                  data: {
                    token: token,
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                  }
                });
              } else {
                res.status(400).json({
                  status: 400,
                  error: 'please, login with a valid email'
                });
              }
            });
          }
        });
      });
    }
  }]);

  return Signin;
}();

var signin = new Signin();
var _default = signin;
exports["default"] = _default;