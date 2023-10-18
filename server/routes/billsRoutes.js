const express = require('express');
const {
    getBills,
    createBill,
} = require('../controllers/billController');

const router = express.Router();

router.get('/', getBills);

router.get('/:id', (req, res) => {
    res.json({ msg: 'Get a single bill' });
});

router.post('/', createBill);

router.delete('/', (req, res) => {
    res.json({ msg: 'Delete a single bill' });
});

router.patch('/', (req, res) => {
    res.json({ msg: 'Update a single bill' });
});

module.exports = router;