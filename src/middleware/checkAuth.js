import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: 'Access Denied',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userData = decoded;
      next();
    } catch (error) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Token',
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      error: 'Access Denied',
    });
  }
};

export default auth;
