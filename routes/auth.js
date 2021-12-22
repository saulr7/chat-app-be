const { Router } = require('express');

const { check } = require('express-validator');
const authController = require('../controllers/auth');
const { validateFields } = require('../middleware/validate-fields');
const { validateJWT } = require('../middleware/validate-jwt');

/*
    PATH : api/auth
*/

const router = Router();

router.post('/new', [
  check('name', 'must send name').not().isEmpty(),
  check('email', 'must send email').isEmail(),
  check('password', 'password required').not().isEmpty(),
  validateFields,
], authController.createUser);

router.post('/login', [
  check('email', 'must send email').isEmail(),
  check('password', 'password required').not().isEmpty(),
  validateFields,
], authController.login);

router.get('/renew', validateJWT, authController.renewToken);

module.exports = router;
