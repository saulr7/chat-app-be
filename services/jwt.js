const jwt = require('jsonwebtoken');

const generateJWT = (uid) => new Promise((res, rej) => {
  const payload = { uid };

  jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '24h',
  }, (err, token) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return rej(new Error("couldn't generate token"));
    }
    return res(token);
  });
});

const verifyJWT = (token = '') => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};

module.exports = { generateJWT, verifyJWT };
