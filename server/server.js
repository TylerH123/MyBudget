// Import the required modules
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI;

// Define the MongoDB Atlas connection UR
// Start listening once db connection is established
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connected");
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
