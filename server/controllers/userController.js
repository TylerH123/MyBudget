const userModel = require('../models/userModel');
const authService = require('../services/authService');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '30d' });
}

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

// Get all the categories for a user as an array
const getCategoriesAsOptions = async (req, res) => {
    try {
        const { _id } = req.user;
        const query = await userModel.findOne({ _id }, { _id: 0, categories: 1 });
        let options = [];
        query.categories.forEach((item) => {
            options.push({value: item, label: item});
        });

        res.status(200).json(options);
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while retrieving categories'});
    }
}

// Export the functions
module.exports = {
    loginUser,
    signupUser,
    getCategoriesAsOptions
};