const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userScheme = new mongoose.Schema({
    categories: {
        type: Array,
        required: true,
		default: ['Eating out', 'Bills', 'Subscriptions', 'Misc', 'Groceries', 'Vacation', 'Transportation']
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
        type: string,
        required: true
    },
	password: {
        type: string,
        required: true
    },
});

const userModel = mongoose.model('Users', userScheme);

// Export the models
module.exports = {
    userModel
};