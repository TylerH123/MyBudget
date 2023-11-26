const express = require('express');
const {
    getBills,
    getBill,
    createBill,
    deleteBill,
    updateBill,
    resetCollection
} = require('../controllers/billController');

const router = express.Router();

router.get('/', getBills);

router.get('/:id', getBill);

router.post('/', createBill);

router.delete('/:id', deleteBill);

router.patch('/:id', updateBill);

router.delete('/all', resetCollection);

module.exports = router;