const billModels = require('../models/billModels');
const { isValid } = require('mongoose').Types.ObjectId;
require('dotenv').config();

const yrToModel = {
    '2023': billModels.bills2023Model,
}
const adminPass = process.env.ADMIN_PASS;

// TODO: validate cateogry
const checkCategoryExists = async (username, category) => {
    const categories = await userModel.findOne({ username: 'Tyler' }, { _id: 0, categories: 1 });

    return true;
}

// Get all bills documents in collection
const getBills = async (req, res) => {
    const { user } = req;
    const { year } = req.params;
    if (!year || !(year in yrToModel)) {
        return res.status(404).json({error: 'Year not provided or year does not exist'});
    }

    // get all bills for owner
    const bills = await yrToModel[year].find({ owner: user }).sort({ date: -1 });
    res.status(200).json(bills);
}

// Get all bills documents for specific category
const getBillsByCategory = async (req, res) => {
    // authenticate signed in user

    const { category, year } = req.params;
    
    if (!checkCategoryExists) {
        return res.status(404).json({error: 'Category does not exist'});
    }
    
    if (!year || !(year in yrToModel)) {
        return res.status(404).json({error: 'Year not provided or year does not exist'});
    }

    // get all bills for owner
    const bills = await yrToModel[year].find({owner: 'Tyler', category: category}).sort({ date: -1 });
    res.status(200).json(bills);
}

// Get single bill document in collection
const getBill = async (req, res) => {
    const { id, year } = req.params;

    // validate id
    if (!isValid(id)) {
        return res.status(404).json({error: 'Bill does not exist'});
    }
    
    if (!year || !(year in yrToModel)) {
        return res.status(404).json({error: 'Year not provided or year does not exist'});
    }

    // authenticate signed in user

    const bills = await yrToModel[year].findById(id);
    if (!bills) {
        return res.status(404).json({error: 'No such bill'});
    }
    res.status(200).json(bills);
}

// Create new bill document in collection
const createBill = async (req, res) => {
    const { user } = req;
    const { year } = req.params;

    if (!year || !(year in yrToModel)) {
        return res.status(404).json({error: 'Year not provided or year does not exist'});
    }

    const { category, subcategory, date, amount, description } = req.body;

    if (!checkCategoryExists) {
        return res.status(404).json({error: 'Category does not exist'});
    }

    try {
        const newBill = await yrToModel[year].create({ owner: user, category, subcategory, date, amount, description });
        res.status(201).json(newBill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a bill in collection
const deleteBill = async (req, res) => {
    const { id, year } = req.params;

    // validate id
    if (!isValid(id)) {
        return res.status(404).json({error: 'Bill does not exist'});
    }

    if (!year || !(year in yrToModel)) {
        return res.status(404).json({error: 'Year not provided or year does not exist'})
    }

    // authenticate signed in user

    const bills = await yrToModel[year].findOneAndDelete({_id: id});
    if (!bills) {
        return res.status(404).json({error: 'No such bill'});
    }
    res.status(200).json(bills);
}

const updateBill = async (req, res) => {
    const { id, year } = req.params;

    // validate id
    if (!isValid(id)) {
        return res.status(404).json({error: 'Bill does not exist'});
    }

    if (!year || !(year in yrToModel)) {
        return res.status(404).json({error: 'Year not provided or year does not exist'});
    }

    // authenticate signed in user

    // validate req body - make sure signed in user is the same as the owner - dont let updates to owner
    console.log(req.body);

    const bills = await yrToModel[year].findOneAndUpdate({_id: id}, {...req.body});
    if (!bills) {
        return res.status(404).json({error: 'No such bill'});
    }
    res.status(200).json(bills);
}

// Empty out a collection for year
const resetCollection = async (req, res) => {
    const { year } = req.params;

    if (!year || !(year in yrToModel)) {
        return res.status(404).json({error: 'Year not provided or year does not exist'});
    }

    const { pass } = req.body;

    if (!pass || pass !== adminPass) {
        return res.status(401).json({error: 'Unauthorized access'});
    }

    if (!year || !(year in yrToModel)) {
        return res.status(404).json({error: 'Collection not provided or collection does not exist'});
    } 

    try {
        await yrToModel[year].deleteMany({});
        res.status(200).json({message: `${year} successfully reset`});
    }
    catch (error) {
        // Log error for debugging purposes
        console.error('Error resetting collection:', error);
        return res.status(500).json({error: 'Resetting collection failed'});
    }
}

// Export the functions
module.exports = {
    getBills,
    getBillsByCategory,
    getBill,
    createBill,
    deleteBill,
    updateBill,
    resetCollection
};