import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: 'Access Denied',
    });
  }
};

export default auth;
