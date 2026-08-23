const express = require('express');
const router = express.Router();
const UserController = require('../controller/User.controller');
const {authenticate} = require('../middleware/auth')


router.post('/signup', UserController.createnewUser);
router.post('/login', UserController.login);

router.get('/', authenticate, UserController.getUser);
router.put('/:id', authenticate, UserController.updateUser);
router.delete('/:id', authenticate, UserController.deleteUser);

module.exports = router;
