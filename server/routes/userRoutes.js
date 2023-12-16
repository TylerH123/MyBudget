const express = require('express');
const {
	loginUser,
	signupUser,
    getCategories,
	getCategoriesAsOptions,
	insertUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.get('/categories', getCategories);

router.get('/categories/options', getCategoriesAsOptions);

router.post('/create', insertUser);

module.exports = router;