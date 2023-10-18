// Import the required modules
const model = require('./models/model');
const express = require('express');

const app = express();
const port = 8000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});