const express = require('express');
const router = express.Router();

const message = require('../utils/messages');
const isEmpty = require('../utils/util');
const successTemplate = require('../Template/success');
const errorTemplate = require('../Template/error');
const {
    getHomeHandler,
    getLoginHandler,
    postLoginHandler,
    getRegisterHandler,
    postRegisterHandler,
    getAboutHandler,
    getLogoutHandler,
} = require('../handler/handleUser');

router.get('/', getHomeHandler);
router.get('/login', getLoginHandler);
router.post('/login', postLoginHandler);
router.get('/register', getRegisterHandler);
router.post('/register', postRegisterHandler);
router.get('/about', getAboutHandler);
router.get('/logout', getLogoutHandler);

module.exports = router;
