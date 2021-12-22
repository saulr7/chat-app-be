const { Router } = require('express');
const { getChat } = require('../controllers/message');
const { validateJWT } = require('../middleware/validate-jwt');

/*
PATH : /api/messages
*/

const router = Router();

router.get('/:from', validateJWT, getChat);

module.exports = router;
