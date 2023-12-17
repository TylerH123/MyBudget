const bcrypt = require('bcrypt');
const validator = require('validator');
const { userModel } = require('../models/userModel');

const signup = async (email, password) => {
	if (!email || !password) {
		throw Error('All fields must be filled in');
	}
	if (!validator.isEmail(email)) {
		throw Error('Email is not valid');
	}
	if (!validator.isStrongPassword(password)) {
		throw Error('Password not strong enough');
	}

	const exists = await userModel.findOne({ email });

	if (exists) {
		throw Error('Email already in use');
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await userModel.create({ email, password: hash });
	
	return user;
}

const login = async (email, password) => {
	if (!email || !password) {
		throw Error('All fields must be filled');
	}

	const user = await userModel.findOne({ email });
	if (!user) {
		throw Error('User with this email does not exist');
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw Error('Invalid login credentials');
	}

	return user;
}

module.exports = { 
	signup,
	login
};