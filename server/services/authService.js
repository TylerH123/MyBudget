const bcrypt = require('bcrypt');
const validator = require('validator');
const { userModel } = require('../models/userModel');

const validate = async (email, password) => {
	if (!email || !password) {
		throw Error('All fields must be filled in');
	}
	if (!validator.isEmail(email)) {
		throw Error('Email is not valid');
	}
	if (!validator.isStrongPassword(password)) {
		throw Error('Password not strong enough');
	}
}

const signup = async (email, password) => {
	validate(email, password);
	const exists = await userModel.findOne({ email });

	if (exists) {
		throw Error('Email already in use');
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await userModel.create({ email, password: hash });
	
	return user;
}

module.exports = { 
	signup
};