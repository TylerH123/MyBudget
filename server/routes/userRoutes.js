const express = require('express');
const {
	signupUser,
	loginUser,
    // getCategories,
	getCategoriesAsOptions
} = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

// require auth to get data for user
router.use(requireAuth);

// router.get('/categories', getCategories);

router.get('/categories/options', getCategoriesAsOptions);

module.exports = router;