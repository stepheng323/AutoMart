import Joi from 'joi';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { carSchema } from '../model/cars';
import pool from '../config';

dotenv.config();

class CarsCreate {
  // eslint-disable-next-line class-methods-use-this
  createCar(req, res) {
    // const result = Joi.validate(req.body, carSchema);

    // if (result.error) {
    //   res.status(400).json({
    //     status: 400,
    //     error: result.error.details[0].message,
    //   });
    //   return;
    // }
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
      };
      const query =				'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
      const values = [
        car.owner,
        car.created_on,
        car.state,
        car.status,
        car.price,
        car.manufacturer,
        car.model,
        car.body_type,
      ];
      pool.connect((err, client, done) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('unable to connect to pool');
          return;
        }
        client.query(query, values, (queryError, queryResult) => {
          done();
          if (queryError) {
            res.status(400).json({
              status: 400,
              error: console.log(queryError),
            });
            return;
          }

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
            },
          });
        });
      });
    } else {
      pool.connect((err, client, done) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('unable to connect to pool');
          return;
        }
        if (!req.file) {
          res.status(400).json({
            status: 400,
            error: 'upload atleast one car image',
          });
          return;
        }
        cloudinary.uploader.upload(req.file.path, (results) => {
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
            };
            const query =							'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type, image_url) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
            const values = [
              car.owner,
              car.created_on,
              car.state,
              car.status,
              car.price,
              car.manufacturer,
              car.model,
              car.body_type,
              car.image_url,
            ];
            client.query(query, values, (queryError, queryResult) => {
              done();
              if (queryError) {
                res.status(400).json({
                  status: 400,
                  error: console.log(queryError),
                });
                return;
              }

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
                },
              });
            });
          } else {
            res.status(500).json({
              status: 500,
              error: 'oops! upload failed, try again',
            });
          }
        });
      });
    }
  }
}
const carscreate = new CarsCreate();
export default carscreate;
