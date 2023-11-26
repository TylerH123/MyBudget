const express = require('express');
const {
    getBills,
    getBillsCategory,
    getBill,
    createBill,
    deleteBill,
    updateBill,
    resetCollection
} = require('../controllers/billController');

const router = express.Router();

router.get('/', getBills);

router.get('/:category', getBillsCategory);

router.get('/bill/:id', getBill);

router.post('/', createBill);

router.patch('/bill/:id', updateBill);

router.delete('/bill/:id', deleteBill);

router.delete('/all', resetCollection);

module.exports = router;