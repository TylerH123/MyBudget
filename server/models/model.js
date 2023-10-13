const mongoose = require('mongoose');

const spendingSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    subCategory: String, // Subcategory is optional (default: null)
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

// Export the model
module.exports = mongoose.model('Spending', spendingSchema);