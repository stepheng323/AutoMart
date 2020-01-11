"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _cars = require("../model/cars");

var _config = _interopRequireDefault(require("../config"));

var _query = require("../helpers/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    value: function createCar(req, res) {
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var result, decoded, car, values, queryResult, dbResult, results, _decoded, _car, _values, _queryResult, _dbResult;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = _joi["default"].validate(req.body, _cars.carSchema);

                if (!result.error) {
                  _context.next = 4;
                  break;
                }

                res.status(400).json({
                  status: 400,
                  error: result.error.details[0].message
                });
                return _context.abrupt("return");

              case 4:
                if (req.file) {
                  _context.next = 14;
                  break;
                }

                decoded = req.userData;
                car = {
                  owner: decoded.id,
                  created_on: new Date(),
                  state: req.body.state,
                  status: 'available',
                  price: req.body.price,
                  manufacturer: req.body.manufacturer,
                  model: req.body.model,
                  body_type: req.body.body_type,
                  color: req.body.color,
                  year: req.body.year,
                  description: req.body.description
                };
                values = [car.owner, car.created_on, car.state, car.status, car.price, car.manufacturer, car.model, car.body_type, car.color, car.year, car.description];
                _context.next = 10;
                return _config["default"].query(_query.newCar, values);

              case 10:
                queryResult = _context.sent;
                dbResult = queryResult.rows[0];
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
                    color: dbResult.color,
                    year: dbResult.year,
                    description: dbResult.description
                  }
                });
                return _context.abrupt("return");

              case 14:
                _context.next = 16;
                return _cloudinary["default"].uploader.upload(req.file.path);

              case 16:
                results = _context.sent;

                if (!(results.secure_url !== undefined)) {
                  _context.next = 28;
                  break;
                }

                _decoded = req.userData;
                _car = {
                  owner: _decoded.id,
                  created_on: new Date(),
                  state: req.body.state,
                  status: 'available',
                  price: req.body.price,
                  manufacturer: req.body.manufacturer,
                  model: req.body.model,
                  body_type: req.body.body_type,
                  image_url: results.secure_url,
                  color: req.body.color,
                  year: req.body.year,
                  description: req.body.description
                };
                _values = [_car.owner, _car.created_on, _car.state, _car.status, _car.price, _car.manufacturer, _car.model, _car.body_type, _car.image_url, _car.color, _car.year, _car.description];
                _context.next = 23;
                return _config["default"].query(_query.newCarWithImage, _values);

              case 23:
                _queryResult = _context.sent;
                _dbResult = _queryResult.rows[0];
                res.status(201).json({
                  status: 201,
                  data: {
                    id: _dbResult.id,
                    email: _decoded.email,
                    created_on: _dbResult.created_on,
                    manufacturer: _dbResult.manufacturer,
                    model: _dbResult.model,
                    price: _dbResult.price,
                    state: _dbResult.state,
                    status: _dbResult.status,
                    image_url: _dbResult.image_url,
                    color: _dbResult.color,
                    year: _dbResult.year,
                    description: _dbResult.description
                  }
                });
                _context.next = 29;
                break;

              case 28:
                res.status(500).json({
                  status: 500,
                  error: 'oops! upload failed, try again'
                });

              case 29:
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

  return CarsCreate;
}();

var carscreate = new CarsCreate();
var _default = carscreate;
exports["default"] = _default;