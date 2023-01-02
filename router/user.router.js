const router = require('express').Router();

const controller = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', controller.getAllUsers)

router.post('/',
    userMiddleware.isNewUserValid,
    userMiddleware.checkIsEmailUnique,
    controller.createUser);

router.get('/:userId',
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically('userId', 'params','_id'),
    controller.getUserById);

router.put('/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.isEditUserValid,
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically('userId', 'params', '_id'),
    controller.updateUser);

router.delete('/:userId',
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    controller.deleteUserById);

module.exports = router;