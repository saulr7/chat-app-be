const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  try {
    const token = req.header('x-token');

    if (!token) {
      return res.status(401).json({ ok: false });
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.uid = payload.uid;

    return next();
  } catch (error) {
    return res.status(401).json({ ok: false });
  }
};

module.exports = { validateJWT };
