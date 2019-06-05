/* eslint-disable class-methods-use-this */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../db/users';

class Signup {
  createUser(req, res) {
    const userSchema = {
      id: Joi.number(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      address: Joi.string().required(),
      is_admin: Joi.boolean().required(),
    };
    const result = Joi.validate(req.body, userSchema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }
    const found = users.find(e => e.email === req.body.email);

    if (found) {
      res.status(409).json({
        status: 409,
        message: 'email has been used ',
      });
      return;
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }

      const user = {
        id: users.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
        address: req.body.address,
        is_admin: req.body.is_admin,
      };

      users.push(user);
      const token = jwt.sign(
        {
          email: user.email,
          id: user.id,
        },
        'thefellowship',
        { expiresIn: '1hr' },
      );
      return res.status(201).json({
        status: 201,
        data: {
          token,
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      });
    });
  }
}

const signup = new Signup();
export default signup;
