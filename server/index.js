// Import the required modules
const mongoose = require('mongoose');
require('dotenv').config();

const db_password = process.env.MONGODB_PASSWORD;

// Define the MongoDB Atlas connection URI
const uri = "mongodb+srv://admin:${db_password}@mybudget.7mfi1b0.mongodb.net/?retryWrites=true&w=majority";

// Create a function to connect to MongoDB using Mongoose
async function connectToMongo() {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB via Mongoose');
}

// Call the function to connect to MongoDB using Mongoose
connectToMongo().catch(console.dir);

// The rest of your application code...
