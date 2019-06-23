"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _pg = _interopRequireDefault(require("pg"));

var _cars = require("../model/cars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var CarsCreate =
/*#__PURE__*/
function () {
  function CarsCreate() {
    _classCallCheck(this, CarsCreate);
  }

  _createClass(CarsCreate, [{
    key: "createCar",
    // eslint-disable-next-line class-methods-use-this
    value: function createCar(req, res) {
      var result = _joi["default"].validate(req.body, _cars.carSchema);

      if (result.error) {
        res.status(400).json({
          status: 400,
          error: result.error.details[0].message
        });
        return;
      }

      if (!req.file) {
        res.status(400).json({
          status: 400,
          error: 'upload atleast one tess car image'
        });
        return;
      }

      var config = {
        user: 'abiodun',
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.DB_PORT,
        max: 10,
        idleTimeoutMillis: 30000
      };
      var pool = new _pg["default"].Pool(config);
      pool.on('connect', function () {
        // eslint-disable-next-line no-console
        console.log('connected to the database');
      });
      pool.connect(function (err, client, done) {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('unable to connect to pool');
          return;
        }

        _cloudinary["default"].uploader.upload(req.file.path, function (results) {
          if (results.secure_url !== undefined) {
            var decoded = req.userData;
            var car = {
              owner: decoded.id,
              created_on: new Date(),
              state: req.body.state,
              status: 'available',
              price: req.body.price,
              manufacturer: req.body.manufacturer,
              model: req.body.model,
              body_type: req.body.body_type,
              car_image: results.secure_url
            };
            var query = 'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, car_image) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
            var values = [car.owner, car.created_on, car.state, car.status, car.price, car.manufacturer, car.model, car.body_type, car.car_image];
            client.query(query, values, function (queryError, queryResult) {
              done();

              if (queryError) {
                res.status(400).json({
                  status: 400,
                  state: console.log(queryError)
                });
                return;
              }

              var dbResult = queryResult.rows[0];
              res.status(201).json({
                status: 201,
                data: {
                  id: dbResult.id,
                  email: decoded.email,
                  created_on: dbResult.created_on,
                  manufacturer: dbResult.manufacturer,
                  model: dbResult.model,
                  price: dbResult.price,
                  state: dbResult.state,
                  status: dbResult.status,
                  car_image: dbResult.car_image
                }
              });
            });
          } else {
            res.status(500).json({
              status: 500,
              error: 'oops! upload failed, try again'
            });
          }
        });
      });
    }
  }]);

  return CarsCreate;
}();

var carscreate = new CarsCreate();
var _default = carscreate;
exports["default"] = _default;