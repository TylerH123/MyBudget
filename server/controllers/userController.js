const { userModel } = require('../models/userModel');
const authService = require('../services/authService');

// TODO: authentication

// Sign up user
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authService.signup(email, password);
        res.status(201).json({ email, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Login user
const loginUser = async (req, res) => {
    res.json({msg: 'Logged in user'}); 
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