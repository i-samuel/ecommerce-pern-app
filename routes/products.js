const express = require('express');
const router = express.Router();
const { throwError } = require('../utils');
const { getAllProducts, searchProducts, newProduct, getSingleProduct, deleteProduct, editProduct } = require('../controllers/products');
const { findProductById } = require('../model/products');
const { isLoggedIn, checkValidationResults } = require('../middleware');
const { body, query } = require('express-validator');

//router params
router.param('productId', async (req, res, next, id) => {
    try {
        //check id is integer
        let productId = parseInt(id);
        if(isNaN(productId)){
            throwError('Product Not Found', 404);
        }
        //check if product exists
        const found = await findProductById(productId);
        if(found.rows.length > 0){
            req.product = found.rows[0];
            next();
        } else {
            throwError('Product Not Found', 404);
        }
    } catch(err) {
        next(err);
    }
})

//get all products
router.get('/', getAllProducts);

//search
router.get('/search', query('searchTerm').trim().notEmpty(), checkValidationResults, searchProducts);

//add new product
router.post('/', 
    [body('title').trim().notEmpty().escape(), 
    body('description').trim().notEmpty().escape(),
    body('imageUrl').trim().notEmpty(), 
    body('price').trim().notEmpty(), 
    body('quantity').trim().notEmpty()], 
    checkValidationResults, 
    newProduct);

//get product by id
router.get('/:productId', getSingleProduct);

//edit product
router.put('/:productId', 
        [body('title').trim().notEmpty().escape(), 
        body('description').trim().notEmpty().escape(),
        body('imageUrl').trim().notEmpty(), 
        body('price').trim().notEmpty(), 
        body('quantity').trim().notEmpty()],
        checkValidationResults,
        editProduct);

//delete produuct
router.delete('/:productId', deleteProduct);


module.exports = router;
