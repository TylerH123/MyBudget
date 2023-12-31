const bcrypt = require('bcrypt');
const validator = require('validator');
const userModel = require('../models/userModel');

const SALT_ROUNDS = 12;

const signup = async (email, password) => {
	if (!email || !password) {
		throw new Error('All fields must be filled in');
	}
	if (!validator.isEmail(email)) {
		throw new Error('Invalid email address');
	}

	const salt = await bcrypt.genSalt(SALT_ROUNDS);
	const hash = await bcrypt.hash(password, salt);

	const user = await userModel.create({ email, password: hash });
	
	return user;
}

const login = async (email, password) => {
	if (!email || !password) {
		throw new Error('All fields must be filled in');
	}

	const user = await userModel.findOne({ email });
	if (!user) {
		throw new Error('User with this email does not exist');
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw new Error('Invalid login credentials');
	}

	return user;
}

module.exports = { 
	signup,
	login
};