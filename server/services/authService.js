const bcrypt = require('bcrypt');
const { userModel } = require('../models/userModel');

const signup = async (email, password) => {
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