import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import users from '../model/users';

class Signin {
  // eslint-disable-next-line class-methods-use-this
  signIn(req, res) {
    const signinSchema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
    };

    const result = Joi.validate(req.body, signinSchema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }
    const found = users.find(e => e.email === req.body.email);
    if (found) {
      bcrypt.compare(req.body.password, found.password, (err, correct) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            message: 'auth failed',
          });
        }
        if (correct) {
          const token = jwt.sign(
            {
              email: found.email,
              id: found.id,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '1hr' },
          );
          return res.status(200).json({
            status: 200,
            data: {
              token,
              id: found.id,
              first_name: found.first_name,
              last_name: found.last_name,
              email: found.email,
            },
          });
        }
        return res.status(401).json({
          status: 401,
          message: 'auth failed',
        });
      });
    }
  }
}

const signin = new Signin();
export default signin;
