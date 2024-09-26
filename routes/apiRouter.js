const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const productsRouter = require('./products');
const categoryRouter = require('./category');
const authRouter = require('./auth');
const userRouter = require('./users');
const cartRouter = require('./cart');
const paymentsRouter = require('./payments');

//bodyparser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.use('/', authRouter);
router.use('/products', productsRouter);
router.use('/users', userRouter);
router.use('/category', categoryRouter);
router.use('/cart', cartRouter);
router.use('/payments-checkout', paymentsRouter);

module.exports = router;