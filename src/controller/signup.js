/* eslint-disable class-methods-use-this */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userSchema } from '../model/users';
import pool from '../config';
import { checkMail, newUser } from '../helpers/query';

dotenv.config();

class Signup {
  createUser(req, res) {
    const result = Joi.validate(req.body, userSchema);

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
          error: 'internal server error',
        });
        return;
      }

      client.query(checkMail, [req.body.email], (error, results) => {
        done();
        if (error) {
          res.status(500).json({
            status: 500,
            error: 'internal server error',
          });
          return;
        }
        if (results.rows[0]) {
          res.status(409).json({
            status: 409,
            error: 'email already exist',
          });
          return;
        }
        bcrypt.hash(req.body.password, 10, (unhash, hash) => {
          if (unhash) {
            res.status(500).json({
              status: 500,
              error: 'internal server error',
            });
            return;
          }

          const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
            address: req.body.address,
            is_admin: false,
          };

          const value2 = [
            user.first_name,
            user.last_name,
            user.email,
            user.password,
            user.address,
            user.is_admin,
          ];
          client.query(newUser, value2, (queryErr, queryResult) => {
            done();
            if (queryErr) {
              return res.status(500).json({
                status: 500,
                error: 'Internal server error',
              });
            }

            const token = jwt.sign(
              {
                email: queryResult.rows[0].email,
                id: queryResult.rows[0].id,
              },
              process.env.TOKEN_SECRET,
              { expiresIn: '1hr' },
            );
            return res.status(201).json({
              status: 201,
              data: {
                token,
                id: queryResult.rows[0].id,
                first_name: queryResult.rows[0].first_name,
                last_name: queryResult.rows[0].last_name,
                email: queryResult.rows[0].email,
              },
            });
          });
        });
      });
    });
  }
}

const signup = new Signup();
export default signup;
