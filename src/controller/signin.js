/* eslint-disable class-methods-use-this */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config';
import { signinSchema } from '../model/users';
import { checkMail } from '../helpers/query';

class Signin {
  signIn(req, res) {
    const result = Joi.validate(req.body, signinSchema);

    if (result.error) {
      res.status(400).json({
        status: 400,
        error: result.error.details[0].message,
      });
      return;
    }
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'Internal Server Error',
        });
        return;
      }
      client.query(checkMail, [req.body.email], (queryError, queryResult) => {
        if (queryError) {
          res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
          });
          return;
        }
        const user = queryResult.rows[0];
        if (!user) {
          res.status(400).json({
            status: 400,
            error: 'Invalid Email and Address Combination',
          });
        }
        done();
        if (user) {
          bcrypt.compare(req.body.password, user.password, (bcryptErr, correct) => {
            if (bcryptErr) {
              res.status(501).json({
                status: 501,
                message: 'Internal server error',
              });
              return;
            }
            if (correct) {
              const token = jwt.sign(
                {
                  email: user.email,
                  id: user.id,
                },
                process.env.TOKEN_SECRET,
                { expiresIn: '1hr' },
              );
              res.status(200).json({
                status: 200,
                data: {
                  token,
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                },
              });
            } else {
              res.status(400).json({
                status: 400,
                error: 'Invalid Email and Address Combination',
              });
            }
          });
        }
      });
    });
  }
}

const signin = new Signin();
export default signin;
