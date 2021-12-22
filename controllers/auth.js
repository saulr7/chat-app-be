const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../services/jwt');
const User = require('../services/User');

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ ok: false, msg: 'email already in use' });
    }

    const user = new User(req.body);
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    const token = await generateJWT(user.id);

    return res.json({ token, user, ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'talk to manager' });
  }
};

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ ok: false, msg: 'wrong credentilas' });
    }

    const matchedPassword = bcrypt.compareSync(password, user.password);

    if (!matchedPassword) {
      return res.status(404).json({ ok: false, msg: 'wrong credentilas' });
    }

    const token = await generateJWT(user.id);
    return res.json({ token, user, ok: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'talk to manager' });
  }
};

const renewToken = async (req, res = response) => {
  const { uid } = req;

  const token = await generateJWT(uid);
  const user = await User.findById(uid);

  return res.json({
    ok: true, uid, token, user,
  });
};

module.exports = { createUser, login, renewToken };
