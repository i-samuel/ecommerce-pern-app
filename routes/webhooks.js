const express = require('express');
const router = express.Router();
const { stripeSuccess } = require('../controllers/payments');


router.post('/stripe-intent-success', express.raw({type: 'application/json'}), stripeSuccess);

module.exports = router;