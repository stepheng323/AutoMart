import joi from 'joi';

const carSchema = {
  id: joi.number(),
  owner: joi.number(),
  created_on: joi.date(),
  state: joi.string().required(),
  status: joi.string().required(),
  price: joi.number().required(),
  manufacturer: joi.string().required(),
  model: joi.string(),
  body_type: joi.string().required(),
};

const cars = [
  {
    id: 1,
    owner: 1,
    created_on: new Date(),
    state: 'used',
    status: 'available',
    price: 50000,
    manufacturer: 'toyota',
    model: 'camry',
    body_type: 'car',
  },
];

export { cars, carSchema };
