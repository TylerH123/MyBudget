const express = require('express');
const {
    getCategories,
	getCategoriesAsOptions,
	insertUser
} = require('../controllers/userController');

const router = express.Router();

router.get('/categories', getCategories);

router.get('/categories/options', getCategoriesAsOptions);

router.post('/create', insertUser);

module.exports = router;