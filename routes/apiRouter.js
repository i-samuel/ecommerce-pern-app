const express = require('express');
const router = express.Router();
const productsRouter = require('./products');
const categoryRouter = require('./category');
const authRouter = require('./auth');
const userRouter = require('./users');
const cartRouter = require('./cart');


router.use('/', authRouter);
router.use('/products', productsRouter);
router.use('/users', userRouter);
router.use('/category', categoryRouter);
router.use('/cart', cartRouter);

module.exports = router;