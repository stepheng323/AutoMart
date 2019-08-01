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

    (async () => {
      const queryResult = await pool.query(checkMail, [req.body.email]);
      if (queryResult.rows[0]) {
        res.status(409).json({
          status: 409,
          error: 'Email Already Exist',
        });
        return;
      }
      const hash = await bcrypt.hash(req.body.password, 10);

      if (hash) {
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

        const queryResult2 = await pool.query(newUser, value2);
        const token = jwt.sign(
          {
            email: queryResult2.rows[0].email,
            id: queryResult2.rows[0].id,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: '1hr' },
        );
        res.status(201).json({
          status: 201,
          data: {
            token,
            id: queryResult2.rows[0].id,
            first_name: queryResult2.rows[0].first_name,
            last_name: queryResult2.rows[0].last_name,
            email: queryResult2.rows[0].email,
          },
        });
      }
    })().catch(() => {
      res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    });
  }
}

const signup = new Signup();
export default signup;
