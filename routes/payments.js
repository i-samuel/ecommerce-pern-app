const express = require('express');
const router = express.Router();

const { confirmOrder, paymentFailed } = require('../controllers/cart');
const { isLoggedIn } = require('../middleware');
const { stripeSuccess } = require('../controllers/payments');



//router.post('/stripe-confirm', confirmOrder);

// ***add isLoggedin
router.post('/failed-stripe', 
    //isLoggedIn,
    paymentFailed);

//router.post('/stripe-webhook-successful', express.raw({type: 'application/json'}), stripeSuccess);

module.exports = router;