const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    categories: {
        type: Array,
        required: true,
		default: ['Food', 'Groceries',  'Misc', 'Rent', 'Subscriptions', 'Transportation', 'Utilities', 'Vacation']
    },
	email: {
		type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
    username: {
        type: String,
        required: true
    },
	password: {
        type: String,
        required: true
    },
});

const userModel = mongoose.model('Users', userSchema, 'Users');

// Export the models
module.exports = {
    userModel
};