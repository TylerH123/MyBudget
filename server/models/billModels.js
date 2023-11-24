const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: String, // Subcategory is optional (default: null)
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        integer: true,
        required: true,
    },
    description: String, // Description is optional
});

const bills2023Model = mongoose.model('Bills2023', billSchema, '2023');

// Export the models
module.exports = {
    bills2023Model
};