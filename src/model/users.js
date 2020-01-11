import Joi from 'joi';

const userSchema = {
  id: Joi.number(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
};

const signinSchema = {
  email: Joi.string().required(),
  password: Joi.string().required(),
};

export { userSchema, signinSchema };
