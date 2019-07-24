import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({
      status: 401,
      error: 'Access Denied',
    });
  }
  const token = bearer.split(' ')[1];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid Token',
      });
    }
    req.userData = data;
    next();
  });
};

export default auth;
