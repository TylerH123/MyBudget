// Import the required modules
const model = require('./models/model');
const express = require('express');
const myBudgetRoutes = require('./routes/spendings')

require('dotenv').config()

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.json({ 'msg': 'Welcome to API' });
});

app.use('/api/spendings', myBudgetRoutes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});