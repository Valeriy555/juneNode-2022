const router = require('express').Router();

const controller = require('../controller/auth.controller');
const userMiddleware = require('../middleware/user.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/login',
    authMiddleware.isBodyValid,
    userMiddleware.getUserDynamically('email'),
    controller.login);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    controller.refresh);

router.post('/logout',
    authMiddleware.checkAccessToken,
    controller.logout);

router.post('/logoutAll',
    authMiddleware.checkAccessToken,
    controller.logoutAll);

module.exports = router;