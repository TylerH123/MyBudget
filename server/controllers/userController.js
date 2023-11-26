const { userModel } = require('../models/users');

// TODO: authentication

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

// Create user and insert into db
const insertUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        await userModel.create({ email, username, password });
        res.status(200).json({ message: "User successfully created" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Export the functions
module.exports = {
    getCategories,
    getCategoriesAsOptions,
	insertUser
};