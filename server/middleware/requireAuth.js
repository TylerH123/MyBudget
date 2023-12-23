const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({error: 'Unauthorized access. Please signup or login'});
	}

	const token = authorization.split(' ')[1];

	try {
		const _id = jwt.verify(token, process.env.SECRET);
		const user = await userModel.findOne({ _id }).select('_id');
		if (!user) {
			throw new Error('User not found');
		}
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({error: 'Unauthorized access. Please signup or login'});
	}
}

module.exports = requireAuth;