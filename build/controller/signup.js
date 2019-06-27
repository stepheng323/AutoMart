"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _users = require("../model/users");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var Signup =
/*#__PURE__*/
function () {
  function Signup() {
    _classCallCheck(this, Signup);
  }

  _createClass(Signup, [{
    key: "createUser",
    value: function createUser(req, res) {
      var result = _joi["default"].validate(req.body, _users.userSchema);

      if (result.error) {
        res.status(400).json({
          status: 400,
          error: result.error.details[0].message
        });
        return;
      }

      _config["default"].connect(function (err, client, done) {
        if (err) {
          res.status(400).json({
            status: 400,
            error: "could not connect to the database ".concat(err)
          });
          return;
        }

        _bcrypt["default"].hash(req.body.password, 10, function (unhash, hash) {
          if (unhash) {
            res.status(500).json({
              error: unhash
            });
            return;
          }

          var user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
            address: req.body.address,
            is_admin: req.body.is_admin
          };
          var query = 'INSERT INTO users(first_name, last_name, email, password, address, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
          var value = [user.first_name, user.last_name, user.email, user.password, user.address, user.is_admin];
          client.query(query, value, function (queryErr, queryResult) {
            done();

            if (queryErr) {
              return res.status(400).json({
                status: 400,
                error: queryErr.detail
              });
            }

            var token = _jsonwebtoken["default"].sign({
              email: queryResult.rows[0].email,
              id: queryResult.rows[0].id
            }, process.env.TOKEN_SECRET, {
              expiresIn: '1hr'
            });

            return res.status(201).json({
              status: 201,
              data: {
                token: token,
                id: queryResult.rows[0].id,
                first_name: queryResult.rows[0].first_name,
                last_name: queryResult.rows[0].last_name,
                email: queryResult.rows[0].email
              }
            });
          });
        });
      });
    }
  }]);

  return Signup;
}();

var signup = new Signup();
var _default = signup;
exports["default"] = _default;