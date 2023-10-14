const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    subcategory: String, // Subcategory is optional (default: null)
    date: {
        type: Date,
        default: Date.now, // Default to today's date
    },
    amount: {
        type: Number,
        required: true,
    },
    description: String, // Description is optional
});

const bill2023Model = mongoose.model('Bill', billSchema, '2023');

// Export the model
module.exports = {
    bill2023Model
};