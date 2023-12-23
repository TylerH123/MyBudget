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
const requireAuth = require('../middleware/requireAuth');

const router = express.Router({ mergeParams: true });

router.delete('/all', resetCollection);

// require auth for all bill routes
router.use(requireAuth);

router.get('/', getBills);

router.get('/:category', getBillsByCategory);

router.get('/bill/:id', getBill);

router.post('/', createBill);

router.patch('/bill/:id', updateBill);

router.delete('/bill/:id', deleteBill);


module.exports = router;