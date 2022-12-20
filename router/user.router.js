const router = require('express').Router();

const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware');

router.get('/', controller.getAllUsers)

router.post('/',
    middleware.isBodyValidCreate,
    controller.createUser);

router.get('/:userId',
    middleware.isIdValid,
    middleware.checkIsUserExist,
    controller.getUserById);

router.put('/:userId',
    middleware.isIdValid,
    middleware.isBodyValidUpdate,
    middleware.checkIsUserExist,
    controller.updateUserById);

router.delete('/:userId',
    middleware.isIdValid,
    middleware.checkIsUserExist,
    controller.deleteUserById);

module.exports = router;