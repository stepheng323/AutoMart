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
    (async () => {
      const { rows } = await pool.query(checkMail, [req.body.email]);
      const user = rows[0];
      if (!user) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid Email or Address Combination',
        });
        // return;
      }
      const verifiedPassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (verifiedPassword) {
        const token = await jwt.sign(
          {
            email: user.email,
            id: user.id,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: '7hr' },
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
          error: 'Invalid Email or Password Combination',
        });
      }
    })().catch(() => {
      res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
      });
    });
  }
}

const signin = new Signin();
export default signin;
