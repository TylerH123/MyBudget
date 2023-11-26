const express = require('express');
const {
    getCategories,
	insertUser
} = require('../controllers/userController');

const router = express.Router();

router.get('/categories', getCategories);

router.post('/create', insertUser);

module.exports = router;