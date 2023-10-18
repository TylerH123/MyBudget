const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ msg: 'GET all spendings' });
});

router.get('/:id', (req, res) => {
    res.json({ msg: 'Get a single spending' });
});

router.post('/', (req, res) => {
    res.json({ msg: 'Post a single spending' });
});

router.delete('/', (req, res) => {
    res.json({ msg: 'Delete a single spending' });
});

router.patch('/', (req, res) => {
    res.json({ msg: 'Update a single spending' });
});

module.exports = router;