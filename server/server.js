// Import the required modules
const model = require('./models/model');
const express = require('express');

require('dotenv').config()

const app = express();
const port = process.env.PORT;

app.get('/', () => {
    res.json({ 'msg': 'Welcome to API' });
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});