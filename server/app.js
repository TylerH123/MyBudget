const express = require('express');
const cors = require('cors');

const billsRoutes = require('./routes/billsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.json({ 'msg': 'Welcome to MyBudget API' });
});

app.use('/api/bills/:year/', billsRoutes);
app.use('/api/users/', userRoutes);

module.exports = app;