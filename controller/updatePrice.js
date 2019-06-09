import joi from 'joi';
import { cars } from '../db/cars';
import users from '../db/users';

class UpdatePrice {
  // eslint-disable-next-line class-methods-use-this
  priceUpdate(req, res) {
    const car = cars.find(c => c.id === parseInt(req.params.id, 10));

    if (!car) {
      res.status(404).json({
        status: 404,
        error: 'car not found',
      });
      return;
    }
    const owner = users.find(u => u.id === car.owner);

    if (!owner) {
      res.status(404).json({
        status: 404,
        error: 'you can only update cars you posted',
      });
      return;
    }
    const schema = {
      price: joi.number().required(),
    };
    const result = joi.validate(req.body, schema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }
    if (car.status !== 'sold') {
      car.price = req.body.price;
      res.status(200).json({
        status: 200,
        data: {
          id: car.id,
          email: owner.email,
          created_on: car.created_on,
          manufacturer: car.manufacturer,
          model: car.model,
          price: car.price,
          state: car.state,
          status: car.status,
        },
      });
    } else {
      res.status(404).json({
        status: 404,
        error: 'car can only be updated when your status is available',
      });
    }
  }
}
const updatePrice = new UpdatePrice();
export default updatePrice;
