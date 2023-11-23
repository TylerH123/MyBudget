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
        default: () => {
            return new Date().setUTCHours(0, 0, 0, 0);
        }
    },
    amount: {
        type: Number,
        required: true,
    },
    description: String, // Description is optional
});

const bills2023Model = mongoose.model('Bills2023', billSchema, '2023');

// Export the models
module.exports = {
    bills2023Model
};