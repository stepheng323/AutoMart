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

var _query = require("../helpers/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var queryResult, hash, user, value2, queryResult2, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _config["default"].query(_query.checkMail, [req.body.email]);

              case 2:
                queryResult = _context.sent;

                if (!queryResult.rows[0]) {
                  _context.next = 6;
                  break;
                }

                res.status(409).json({
                  status: 409,
                  error: 'Email Already Exist'
                });
                return _context.abrupt("return");

              case 6:
                _context.next = 8;
                return _bcrypt["default"].hash(req.body.password, 10);

              case 8:
                hash = _context.sent;

                if (!hash) {
                  _context.next = 17;
                  break;
                }

                user = {
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  email: req.body.email,
                  password: hash,
                  address: req.body.address,
                  is_admin: false
                };
                value2 = [user.first_name, user.last_name, user.email, user.password, user.address, user.is_admin];
                _context.next = 14;
                return _config["default"].query(_query.newUser, value2);

              case 14:
                queryResult2 = _context.sent;
                token = _jsonwebtoken["default"].sign({
                  email: queryResult2.rows[0].email,
                  id: queryResult2.rows[0].id
                }, process.env.TOKEN_SECRET, {
                  expiresIn: '7hr'
                });
                res.status(201).json({
                  status: 201,
                  data: {
                    token: token,
                    id: queryResult2.rows[0].id,
                    first_name: queryResult2.rows[0].first_name,
                    last_name: queryResult2.rows[0].last_name,
                    email: queryResult2.rows[0].email
                  }
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))()["catch"](function () {
        res.status(500).json({
          status: 500,
          error: 'internal server error'
        });
      });
    }
  }]);

  return Signup;
}();

var signup = new Signup();
var _default = signup;
exports["default"] = _default;