"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _config = _interopRequireDefault(require("../config"));

var _query = require("../helpers/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UpdatePrice =
/*#__PURE__*/
function () {
  function UpdatePrice() {
    _classCallCheck(this, UpdatePrice);
  }

  _createClass(UpdatePrice, [{
    key: "priceUpdate",
    value: function priceUpdate(req, res) {
      var schema = {
        price: _joi["default"].number().required()
      };

      var result = _joi["default"].validate(req.body, schema);

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
        var _ref2, rows, decoded, car, value2, priceQuery, car2;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _config["default"].query(_query.checkCar, [req.params.id]);

              case 2:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                decoded = req.userData;
                car = rows[0];

                if (car) {
                  _context.next = 9;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'car not found'
                });
                return _context.abrupt("return");

              case 9:
                if (!(decoded.id !== car.owner)) {
                  _context.next = 12;
                  break;
                }

                res.status(403).json({
                  status: 403,
                  error: 'you can only update cars you posted'
                });
                return _context.abrupt("return");

              case 12:
                if (!(car.status !== 'sold')) {
                  _context.next = 21;
                  break;
                }

                value2 = [req.body.price, req.params.id];
                _context.next = 16;
                return _config["default"].query(_query.updateCarPrice, value2);

              case 16:
                priceQuery = _context.sent;
                car2 = priceQuery.rows[0];
                res.status(200).json({
                  status: 200,
                  data: {
                    id: car2.id,
                    email: decoded.email,
                    created_on: car2.created_on,
                    manufacturer: car2.manufacturer,
                    model: car2.model,
                    price: car2.price,
                    state: car2.state,
                    status: car2.status
                  }
                });
                _context.next = 22;
                break;

              case 21:
                res.status(400).json({
                  status: 400,
                  error: 'A Car can only be updated when status is available'
                });

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))()["catch"](function () {
        res.status(500).json({
          status: 500,
          error: 'Internal server error'
        });
      });
    }
  }, {
    key: "sold",
    value: function sold(req, res) {
      var schema = {
        status: _joi["default"].string().required()
      };

      var result = _joi["default"].validate(req.body, schema);

      if (result.error) {
        res.status(400).json({
          status: 400,
          error: result.error.details[0].message
        });
        return;
      }

      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _ref4, rows, car, decoded, value2, result2, car2;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _config["default"].query(_query.checkCar, [req.params.id]);

              case 2:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                car = rows[0];

                if (car) {
                  _context2.next = 8;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'car not found'
                });
                return _context2.abrupt("return");

              case 8:
                decoded = req.userData;

                if (!(decoded.id !== car.owner)) {
                  _context2.next = 12;
                  break;
                }

                res.status(403).json({
                  status: 403,
                  error: 'you can only update cars you posted'
                });
                return _context2.abrupt("return");

              case 12:
                if (!(car.status !== 'sold')) {
                  _context2.next = 21;
                  break;
                }

                value2 = [req.body.status, req.params.id];
                _context2.next = 16;
                return _config["default"].query(_query.updateCarStatus, value2);

              case 16:
                result2 = _context2.sent;
                car2 = result2.rows[0];
                res.status(200).json({
                  status: 200,
                  data: {
                    id: car2.id,
                    email: decoded.email,
                    created_on: car2.created_on,
                    manufacturer: car2.manufacturer,
                    model: car2.model,
                    price: car2.price,
                    state: car2.state,
                    status: car2.status
                  }
                });
                _context2.next = 22;
                break;

              case 21:
                res.status(403).json({
                  status: 403,
                  error: 'This Car has Already Been Sold'
                });

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))()["catch"](function () {
        res.status(500).json({
          status: 500,
          error: 'Internal server error'
        });
      });
    }
  }]);

  return UpdatePrice;
}();

var updatePrice = new UpdatePrice();
var _default = updatePrice;
exports["default"] = _default;