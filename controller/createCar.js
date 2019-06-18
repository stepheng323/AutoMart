import Joi from 'joi';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { cars, carSchema } from '../model/cars';

dotenv.config();

class CarsCreate {
  // eslint-disable-next-line class-methods-use-this
  createCar(req, res) {
    const result = Joi.validate(req.body, carSchema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }
    if (!req.file) {
      res.status(400).json({
        status: 400,
        error: 'upload atleast on car image',
      });
      return;
    }
    cloudinary.uploader.upload(req.file.path, (results) => {
      if (results.secure_url !== undefined) {
        const decoded = req.userData;
        const car = {
          id: cars.length + 1,
          owner: decoded.id,
          created_on: new Date(),
          state: req.body.state,
          status: req.body.status,
          price: req.body.price,
          manufacturer: req.body.manufacturer,
          model: req.body.model,
          body_type: req.body.body_type,
          product_image: results.secure_url,
        };
        cars.push(car);
        res.status(201).json({
          status: 201,
          data: {
            id: car.id,
            email: decoded.email,
            created_on: car.created_on,
            manufacturer: car.manufacturer,
            model: car.model,
            price: car.price,
            state: car.state,
            status: car.status,
            product_image: car.product_image,
          },
        });
      } else {
        res.status(500).json({
          status: 500,
          error: 'oops! upload fails, try again',
        });
      }
    });
  }
}
const carscreate = new CarsCreate();
export default carscreate;
