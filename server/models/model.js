const mongoose = require('mongoose');
const schema = require('./schema');

const bills2023Model = mongoose.model('Bill', schema.billSchema, '2023');

const yrToModel = {
    '2023': bills2023Model,
}

require('dotenv').config();

const uri = process.env.MONGODB_URI;

// Define the MongoDB Atlas connection UR
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// create connection to db
const db = mongoose.connection;

// handle mongo connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function createNewBill(collectionName, billDetails) {
    try {
        const newBill = new yrToModel[collectionName]({
            category: billDetails.category,
            subcategory: billDetails.subcategory,
            date: billDetails.date,
            amount: billDetails.amount,
            description: billDetails.description,
        });
        const savedBill = newBill.save()
            .then((result) => {
                console.log(result);
            });
        return savedBill;
    } catch (e) {
        console.error(e);
    }
}

// create a one time document and save to 2023 collections
// db.once('open', async () => {
//     const billDetails = {
//         category: "Eating out",
//         subcategory: "Kang's",
//         date: new Date("2023-10-07"),
//         amount: 14.94,
//         description: "",
//     };

//     const savedBill = createNewBill('2023', billDetails);
// });

// Export the model
module.exports = {
    createNewBill
};