import Joi from 'joi';

const users = [
  {
    id: 1,
    email: 'stepheng323@gmail.com',
    first_name: 'abiodun',
    last_name: 'oyebanji',
    password: 'olaTUNDE',
    address: '13 omolola close',
    is_admin: true,
  },
];

const userSchema = {
  id: Joi.number(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
  is_admin: Joi.boolean().required(),
};

const signinSchema = {
  email: Joi.string().required(),
  password: Joi.string().required(),
};

export { users, userSchema, signinSchema };
