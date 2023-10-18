const express = require('express');
const router = express.Router();
const model = require('../models/model');

router.get('/', (req, res) => {
    res.json({ msg: 'GET all spendings' });
});

router.get('/:id', (req, res) => {
    res.json({ msg: 'Get a single spending' });
});

router.post('/', async (req, res) => {
    const billDetails = {
        category: "Eating out",
        subcategory: "Kang's",
        date: new Date("2023-10-07"),
        amount: 14.94,
        description: "",
    };

    try {
        const spending = await model.createNewBill('2023', billDetails);
        res.status(200).json(spending)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/', (req, res) => {
    res.json({ msg: 'Delete a single spending' });
});

router.patch('/', (req, res) => {
    res.json({ msg: 'Update a single spending' });
});

module.exports = router;