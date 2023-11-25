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

router.get('/bills/', getBills);

router.get('/bill/:id', getBill);

router.post('/bills/', createBill);

router.delete('/bill/:id', deleteBill);

router.patch('/bill/:id', updateBill);

router.delete('/bills/all', resetCollection);

module.exports = router;