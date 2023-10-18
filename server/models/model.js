const billModels = require('./billModels');

const yrToModel = {
    '2023': billModels.bills2023Model,
}

// Create new spending document in collection
function createNewBill(collectionName, billDetails) {
    const newBill = yrToModel[collectionName].create({
        category: billDetails.category,
        subcategory: billDetails.subcategory,
        date: billDetails.date,
        amount: billDetails.amount,
        description: billDetails.description,
    });
    return newBill;
}

// Export the functions
module.exports = {
    createNewBill
};