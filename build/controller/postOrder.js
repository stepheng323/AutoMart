"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _orders = _interopRequireDefault(require("../model/orders"));

var _config = _interopRequireDefault(require("../config"));

var _query = require("../helpers/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var CreateOrders =
/*#__PURE__*/
function () {
  function CreateOrders() {
    _classCallCheck(this, CreateOrders);
  }

  _createClass(CreateOrders, [{
    key: "createOrder",
    value: function createOrder(req, res) {
      var result = _joi["default"].validate(req.body, _orders["default"]);

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
        var _ref2, rows, car, decoded, querysResult, orderFilter, order, value, queryResult2, dbOrder;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _config["default"].query(_query.checkCar, [req.body.car_id]);

              case 2:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                car = rows[0];

                if (car) {
                  _context.next = 8;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'Car Not Found'
                });
                return _context.abrupt("return");

              case 8:
                if (!(car.status !== 'available')) {
                  _context.next = 11;
                  break;
                }

                res.status(403).json({
                  status: 403,
                  error: 'You can only order available cars'
                });
                return _context.abrupt("return");

              case 11:
                decoded = req.userData;
                _context.next = 14;
                return _config["default"].query(_query.orderExist, [req.body.car_id, decoded.id]);

              case 14:
                querysResult = _context.sent;
                orderFilter = querysResult.rows[0]; // check if the user have already made an order of this same car

                if (!orderFilter) {
                  _context.next = 19;
                  break;
                }

                res.status(409).json({
                  status: 409,
                  error: 'you already ordered this car'
                });
                return _context.abrupt("return");

              case 19:
                order = {
                  buyer: decoded.id,
                  car_id: req.body.car_id,
                  amount: req.body.amount,
                  status: 'pending'
                };
                value = [order.buyer, order.car_id, order.amount, order.status];
                _context.next = 23;
                return _config["default"].query(_query.newOrder, value);

              case 23:
                queryResult2 = _context.sent;
                dbOrder = queryResult2.rows[0];
                res.status(201).json({
                  status: 201,
                  data: {
                    id: dbOrder.id,
                    car_id: car.id,
                    created_on: car.created_on,
                    status: dbOrder.status,
                    price: car.price,
                    price_offerd: dbOrder.amount
                  }
                });

              case 26:
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

  return CreateOrders;
}();

var createOrders = new CreateOrders();
var _default = createOrders;
exports["default"] = _default;