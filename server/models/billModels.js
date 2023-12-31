const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
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
const bills2024Model = mongoose.model('Bills2024', billSchema, '2024');

// Export the models
module.exports = {
    bills2023Model,
    bills2024Model
};