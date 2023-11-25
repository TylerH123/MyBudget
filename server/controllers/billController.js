const billModels = require('../models/billModels');
const { isValid } = require('mongoose').Types.ObjectId;
require('dotenv').config();

const yrToModel = {
    '2023': billModels.bills2023Model,
}
const adminPass = process.env.ADMIN_PASS;

// TODO: find date from req and change collection inserting into

// Get all bills documents in collection
const getBills = async (req, res) => {
    // authenticate signed in user

    // get all bills for owner
    const bills = await yrToModel['2023'].find({owner: 'Tyler'}).sort({ date: -1 });
    res.status(200).json(bills);
}

// Get single bill document in collection
const getBill = async (req, res) => {
    const { id } = req.params;

    // validate id
    if (!isValid(id)) {
        return res.status(404).json({error: "No such bill"});
    }

    // authenticate signed in user

    const bills = await yrToModel['2023'].findById(id);
    if (!bills) {
        return res.status(404).json({error: "No such bill"});
    }
    res.status(200).json(bills);
}

// Create new bill document in collection
const createBill = async (req, res) => {
    const { owner, category, subcategory, date, amount, description } = req.body;

    try {
        const newBill = await yrToModel['2023'].create({ owner, category, subcategory, date, amount, description });
        res.status(200).json(newBill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteBill = async (req, res) => {
    const { id } = req.params;

    // validate id
    if (!isValid(id)) {
        return res.status(404).json({error: "No such bill"});
    }

    // authenticate signed in user

    const bills = await yrToModel['2023'].findOneAndDelete({_id: id});
    if (!bills) {
        return res.status(404).json({error: "No such bill"});
    }
    res.status(200).json(bills);
}

const updateBill = async (req, res) => {
    const { id } = req.params;

    // validate id
    if (!isValid(id)) {
        return res.status(404).json({error: "No such bill"});
    }

    // authenticate signed in user

    // validate req body - make sure signed in user is the same as the owner - dont let updates to owner
    console.log(req.body);

    const bills = await yrToModel['2023'].findOneAndUpdate({_id: id}, {...req.body});
    if (!bills) {
        return res.status(404).json({error: "No such bill"})
    }
    res.status(200).json(bills);
}

const resetCollection = async (req, res) => {
    const { pass, collection } = req.body;

    if (!pass || pass !== adminPass) {
        return res.status(401).json({error: "Unauthorized access"});
    }

    if (!(collection in yrToModel)) {
        return res.status(404).json({error: "Collection not provided or collection does not exist"});
    } 

    try {
        await yrToModel[collection].deleteMany({});
        res.status(200).json({message: `${collection} successfully reset`});
    }
    catch (error) {
        // Log error for debugging purposes
        console.error("Error resetting collection:", error);

        return res.status(500).json({error: "Resetting collection failed"});
    }
}

// Export the functions
module.exports = {
    getBills,
    getBill,
    createBill,
    deleteBill,
    updateBill,
    resetCollection
};