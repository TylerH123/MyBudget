const express = require('express');
const {
    getBills,
    getBillsByCategory,
    getBill,
    createBill,
    deleteBill,
    updateBill,
    resetCollection
} = require('../controllers/billController');

const router = express.Router();

router.get('/:year', getBills);

router.get('/:year/:category', getBillsByCategory);

router.get('/:year/bill/:id', getBill);

router.post('/', createBill);

router.patch('/:year/bill/:id', updateBill);

router.delete('/:year/bill/:id', deleteBill);

router.delete('/:year/all', resetCollection);

module.exports = router;