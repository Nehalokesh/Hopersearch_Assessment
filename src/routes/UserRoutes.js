const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/signup', UserController.signUp);
router.post('/signIn', UserController.signIn);
router.post('/resetPassword', UserController.resetPassword);
router.put('/updateProfile/:id', UserController.updateProfile);
router.put('/changePassword/:id',  UserController.changePassword);
router.post('/logout', UserController.logout);

module.exports = router;
