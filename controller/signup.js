/* eslint-disable class-methods-use-this */
import Joi from 'joi';
import users from '../db/users';

const schema = {
  id: Joi.number(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
  is_admin: Joi.boolean().required(),
};

class Signup {
  postUser(req, res) {
    const result = Joi.validate(req.body, schema);

    if (result.error) {
      res.status(400).send({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }

    const user = {
      id: users.length + 1,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      is_admin: req.body.is_admin,
    };

    users.push(user);

    res.status(201).send({
      status: 201,
      data: {
        token: '45erkjherht45495783',
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  }
}

const signup = new Signup();
export default signup;
