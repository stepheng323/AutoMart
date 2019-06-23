/* eslint-disable class-methods-use-this */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';

import { signinSchema } from '../model/users';

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
    const config = {
      user: 'abiodun' || 'owxxiojqpvmffq',
      database: process.env.DATABASE || 'd7k5b8u2k7s9rp',
      password: process.env.PASSWORD || '849b56cbbb20121dc14ee194301797bbfec60cfbbe16e20dd5a028ed6e90c667',
      port: process.env.DB_PORT,
      max: 10,
      idleTimeoutMillis: 30000,
    };
    const pool = new pg.Pool(config);

    pool.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('connected to the Database');
    });

    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'could not connect to the pool',
        });
        return;
      }
      const query = 'SELECT * FROM users WHERE email = $1';
      const value = [req.body.email];
      client.query(query, value, (queryError, queryResult) => {
        done();
        if (queryError) {
          res.status(400).json({
            status: 400,
            error: queryError,
          });
          return;
        }
        const user = queryResult.rows[0];
        if (!user) {
          res.status(400).json({
            status: 400,
            error: 'invalid email or address',
          });
        }
        if (queryResult.rows[0]) {
          bcrypt.compare(req.body.password, user.password, (bcryptErr, correct) => {
            if (bcryptErr) {
              res.status(401).json({
                status: 401,
                message: 'invalid email or password',
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
                error: 'please, login with a valid email',
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
