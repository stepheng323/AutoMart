"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _pg = _interopRequireDefault(require("pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    // eslint-disable-next-line class-methods-use-this
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
          res.status(400).json({
            status: 400,
            error: 'could not connect to the pool'
          });
          return;
        }

        var query = 'SELECT * FROM cars WHERE id = $1';
        var value = [req.params.id];
        client.query(query, value, function (queryError, results) {
          if (queryError) {
            res.status(500).json({
              status: 500,
              error: "".concat(queryError)
            });
            return;
          }

          var decoded = req.userData;
          var car = results.rows[0];

          if (!car) {
            res.status(404).json({
              status: 404,
              error: 'car not found'
            });
            return;
          } // check to see if the user is the car owner


          if (decoded.id !== car.owner) {
            res.status(403).json({
              status: 403,
              error: 'you can only update cars you posted'
            });
            return;
          }

          if (car.status !== 'sold') {
            var query2 = 'UPDATE cars SET price =$1 WHERE id = $2 RETURNING *';
            var value2 = [req.body.price, req.params.id];
            client.query(query2, value2, function (queryError2, result2) {
              done();

              if (queryError2) {
                res.status(500).json({
                  status: 500,
                  error: "".concat(queryError2)
                });
                return;
              }

              var car2 = result2.rows[0];
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
            });
          } else {
            res.status(404).json({
              status: 404,
              error: 'car can only be updated when status is available'
            });
          }
        });
      });
    } // eslint-disable-next-line class-methods-use-this

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
        console.log('Connected to the Database');
      });
      pool.connect(function (err, client, done) {
        if (err) {
          res.status(400).json({
            status: 400,
            error: 'Could not connect to the database'
          });
          return;
        }

        var query = 'SELECT * FROM cars WHERE id = $1';
        var value = [req.params.id];
        client.query(query, value, function (queryError, results) {
          if (queryError) {
            res.status(400).json({
              status: 400,
              error: "".concat(queryError)
            });
            return;
          }

          var car = results.rows[0];

          if (!car) {
            res.status(404).json({
              status: 404,
              error: 'car not found'
            });
            return;
          }

          var decoded = req.userData;

          if (decoded.id !== car.owner) {
            res.status(404).json({
              status: 404,
              error: 'you can only update cars you posted'
            });
            return;
          }

          if (car.status !== 'sold') {
            var query2 = 'UPDATE cars SET status =$1 WHERE id = $2 RETURNING *';
            var value2 = [req.body.status, req.params.id];
            client.query(query2, value2, function (queryError2, result2) {
              done();
              var car2 = result2.rows[0];
              res.status(201).json({
                status: 201,
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
            });
          } else {
            res.status(403).json({
              status: 403,
              error: 'A car can only be updated when the status is available'
            });
          }
        });
      });
    }
  }]);

  return UpdatePrice;
}();

var updatePrice = new UpdatePrice();
var _default = updatePrice;
exports["default"] = _default;