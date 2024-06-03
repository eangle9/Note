const express = require('express');
const { registerUser, authUser, editUserProfile, updatePassword } = require('../controllers/userController');
const protect = require('../middlewares/noteMiddleware');
const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').post(protect, editUserProfile);
router.route('/account').post(protect, updatePassword);

module.exports = router;