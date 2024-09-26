const express = require('express');
const router = express.Router();
const { getCartItems, addToCart, removeCartItem, emptyCart, createOrder } = require('../controllers/cart');
const { isLoggedIn, setCartId } = require('../middleware');

router.use('/', 
    isLoggedIn, 
    setCartId);

//get cart items
router.get('/', getCartItems);

//add single product to cart
router.post('/', addToCart);

///checkout 
router.post('/create-order', createOrder);

//remove single item from cart
router.delete('/', removeCartItem);

//remove all from cart
router.delete('/empty', emptyCart);

module.exports = router;