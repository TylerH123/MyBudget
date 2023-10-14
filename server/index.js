// Import the required modules
const mongoose = require('mongoose');
const models = require('./models/model');

const yrToModel = {
    '2023': models.bill2023Model,
}

require('dotenv').config();

const dbPassword = process.env.MONGODB_PASSWORD;

// Define the MongoDB Atlas connection URI
const uri = `mongodb+srv://admin:${dbPassword}@mybudget.7mfi1b0.mongodb.net/?retryWrites=true&w=majority`;
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

        return newBill;
    } catch (e) {
        console.error(e);
    }
}

// create a one time document and save to 2023 collections
db.once('open', async () => {
    try {
        const billDetails = {
            category: "Eating out",
            subcategory: "Kang's",
            date: new Date("2023-10-07"),
            amount: 14.94,
            description: "",
        };

        const newBill = await createNewBill('2023', billDetails);
        const savedBill = await newBill.save();
        console.log("New bill saved: ", savedBill);
    } catch (e) {
        console.error(e);
    }
});
