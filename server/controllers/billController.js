const billModels = require('../models/billModels');

const yrToModel = {
    '2023': billModels.bills2023Model,
}

// Get all bills documents in collection
const getBills = async (req, res) => {
    const bills = await yrToModel['2023'].find({}).sort({ date: -1 });
    res.status(200).json(bills);
}

// Get single bill document in collection

// Create new bill document in collection
const createBill = async (req, res) => {
    const { category, subcategory, date, amount, description } = req.body;

    try {
        const newBill = await yrToModel['2023'].create({ category, subcategory, date, amount, description });
        res.status(200).json(newBill)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Export the functions
module.exports = {
    getBills,
    createBill
};