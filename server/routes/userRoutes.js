const express = require('express');
const {
	signupUser,
	loginUser,
    getCategories,
	getCategoriesAsOptions
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.get('/categories', getCategories);

router.get('/categories/options', getCategoriesAsOptions);

module.exports = router;