"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _orders = require("../model/orders");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    // eslint-disable-next-line class-methods-use-this
    value: function createOrder(req, res) {
      var result = _joi["default"].validate(req.body, _orders.orderSchema);

      if (result.error) {
        res.status(400).json({
          status: 400,
          error: result.error.details[0].message
        });
        return;
      }

      _config["default"].connect(function (err, client, done) {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('unable to connect to pool');
          return;
        }

        var decoded = req.userData;
        var order = {
          buyer: decoded.id,
          car_id: req.body.car_id,
          amount: req.body.amount,
          status: 'pending'
        };
        var query = 'INSERT INTO orders(buyer, car_id, amount, status) VALUES ($1, $2, $3, $4) RETURNING *';
        var value = [order.buyer, order.car_id, order.amount, order.status];
        client.query(query, value, function (queryError, queryResult) {
          if (queryError) {
            res.status(400).json({
              status: 400,
              errorr: queryError.detail
            });
            return;
          }

          var dbResult = queryResult.rows[0];
          var query2 = 'SELECT * FROM cars WHERE id = $1';
          var id = [dbResult.car_id];
          client.query(query2, id, function (queryError2, queryResult2) {
            done();

            if (queryError2) {
              res.status(400).json({
                status: 400,
                error: queryError2.detail
              });
              return;
            }

            var dbResult2 = queryResult2.rows[0];
            res.status(201).json({
              status: 201,
              data: {
                id: dbResult.id,
                car_id: dbResult.car_id,
                created_on: dbResult2.created_on,
                status: dbResult.status,
                price: dbResult2.price,
                price_offerd: dbResult.amount
              }
            });
          });
        });
      });
    }
  }]);

  return CreateOrders;
}();

var createOrders = new CreateOrders();
var _default = createOrders;
exports["default"] = _default;