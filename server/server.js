// Import the required modules
const model = require('./models/model');
const express = require('express');
const myBudgetRoutes = require('./routes/spendings');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.json({ 'msg': 'Welcome to API' });
});

app.use('/api/spendings', myBudgetRoutes);

// Define the MongoDB Atlas connection UR
// Start listening once db connection is established
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connected");
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
});
