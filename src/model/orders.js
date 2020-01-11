import joi from 'joi';

const orderSchema = {
  car_id: joi.number().required(),
  amount: joi.number().required(),
};

export default orderSchema;
