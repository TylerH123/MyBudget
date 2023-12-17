const { userModel } = require('../models/userModel');
const authService = require('../services/authService');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '30d' });
}

// TODO: authentication

// Sign up user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authService.signup(email, password);
        const token = createToken(user._id);
        res.status(201).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// Get all bills documents in collection
const getCategories = async (req, res) => {
	// TODO: 
    // authenticate signed in user
	// change the find parameters

    // get all the categories for owner
    const categories = await userModel.findOne({ username: 'Tyler' }, { _id: 0, categories: 1 });
    res.status(200).json(categories);
}

const getCategoriesAsOptions = async (req, res) => {
    const query = await userModel.findOne({ username: 'Tyler' }, { _id: 0, categories: 1 });
    let options = [];
    query.categories.forEach((item) => {
        options.push({value: item, label: item});
    });

    res.status(200).json(options);
}

// Export the functions
module.exports = {
    loginUser,
    signupUser,
    getCategories,
    getCategoriesAsOptions
};