const express = require('express');
const router = express.Router();

const { paymentFailed } = require('../controllers/cart');
const { isLoggedIn } = require('../middleware');


//router.post('/stripe-confirm', confirmOrder);

router.post('/failed-stripe', 
    isLoggedIn,
    paymentFailed);

module.exports = router;