const {fileServices} = require("../services");
const router = require('express').Router();
const controller = require('../controller/user.controller');

router.get('/', controller.getAllUsers)


router.get('/:userId', controller.getUserById);

router.post('/', controller.postUser);

router.put('/:userId', controller.updateUserById);

router.delete('/:userId', controller.deleteUserById);

module.exports = router;