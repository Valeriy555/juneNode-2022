const router = require('express').Router();

const controller = require('../controller/user.controller');
const middleware = require('../middleware/user.middleware');

router.get('/', controller.getAllUsers)

router.post('/', middleware.isBodyValid, controller.createUser);

router.get('/:userId', middleware.checkIsUserExist, controller.getUserById);

router.put('/:userId', middleware.checkIsUserExist, controller.updateUserById);

router.delete('/:userId', controller.deleteUserById);

module.exports = router;