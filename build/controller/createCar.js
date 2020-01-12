"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _cars = require("../model/cars");

var _config = _interopRequireDefault(require("../config"));

var _query = require("../helpers/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable class-methods-use-this */
_dotenv.default.config();

class CarsCreate {
  createCar(req, res) {
    (async () => {
      const result = _joi.default.validate(req.body, _cars.carSchema);

      if (result.error) {
        res.status(400).json({
          status: 400,
          error: result.error.details[0].message
        });
        return;
      }

      if (!req.file) {
        const decoded = req.userData;
        const car = {
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
        const values = [car.owner, car.created_on, car.state, car.status, car.price, car.manufacturer, car.model, car.body_type, car.color, car.year, car.description];
        const queryResult = await _config.default.query(_query.newCar, values);
        const dbResult = queryResult.rows[0];
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
        return;
      }

      const results = await _cloudinary.default.uploader.upload(req.file.path);

      if (results.secure_url !== undefined) {
        const decoded = req.userData;
        const car = {
          owner: decoded.id,
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
        const values = [car.owner, car.created_on, car.state, car.status, car.price, car.manufacturer, car.model, car.body_type, car.image_url, car.color, car.year, car.description];
        const queryResult = await _config.default.query(_query.newCarWithImage, values);
        const dbResult = queryResult.rows[0];
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
            image_url: dbResult.image_url,
            color: dbResult.color,
            year: dbResult.year,
            description: dbResult.description
          }
        });
      } else {
        res.status(500).json({
          status: 500,
          error: 'oops! upload failed, try again'
        });
      }
    })().catch(() => {
      res.status(500).json({
        status: 500,
        error: 'internal server error'
      });
    });
  }

}

const carscreate = new CarsCreate();
var _default = carscreate;
exports.default = _default;