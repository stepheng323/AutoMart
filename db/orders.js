import joi from 'joi';

const orders = [
  {
    id: 1,
    buyer: 1,
    car_id: 1,
    amount: 5000,
    status: 'pending',
  },
];
const orderSchema = {
  car_id: joi.number().required(),
  amount: joi.number().required(),
};

export { orders, orderSchema };
