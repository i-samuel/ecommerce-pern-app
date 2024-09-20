const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { getCartItems, addToCart, removeCartItem, emptyCart, checkout } = require('../controllers/cart');
const { isLoggedIn, setCartId } = require('../middleware');

//isLoggedIn

router.use('/', 
    //isLoggedIn, 
    setCartId);

//get cart items
router.get('/', getCartItems);

//add single product to cart
router.post('/', addToCart);

///checkout 
router.post('/checkout', checkout);

//remove single item from cart
router.delete('/', removeCartItem);

//remove all from cart
router.delete('/empty', emptyCart);

module.exports = router;