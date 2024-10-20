const { throwError } = require('../utils');
const { fetchProductSearch, fetchAllProducts, addNewProduct, deleteSingleProduct, updateProduct }  = require('../model/products');
//const { trim, isEmpty, escape } = require('validator');

//get all products
exports.getAllProducts = async (req, res, next) => {

    try {
        const products = await fetchAllProducts();
        if(products.rows.length === 0){
            throwError("No Products Found", 404);
        }        
        return res.status(200).json({ products: products.rows });
    
    } catch(err) {
        next(err);
    }
}

//search products
exports.searchProducts = async (req, res, next) => {
    try {
        let { searchTerm } = req.query;    
        const results = await fetchProductSearch(searchTerm);        

        return res.status(200).json({ products: results.rows });
    } catch(err){
        next(err);
    }
}

//add new product
exports.newProduct = async (req, res, next) => {

    const {title, description, price, imageUrl, quantity} = req.body;
    const priceTo = parseFloat(price);
    const quantityTo = parseFloat(quantity);    
   
    try{
        if(isNaN(quantityTo) || isNaN(priceTo) || priceTo <= 0 || quantityTo % 1 !== 0 || quantityTo <= 0 ) {            
            throwError('Enter Valid Data', 400);
        }
        const product = await addNewProduct({
            title,
            description,
            image_url: imageUrl,
            price: priceTo.toFixed(2),
            quantity: quantityTo
        });

        if(product.rows.length === 0){
            throwError("Database Connection Error", 500);
        }
        return res.status(201).send('New Product Added');    

    } catch(err) {
        next(err);
    }
}

//get single poduct
exports.getSingleProduct = async (req, res) => {
    return res.json(req.product);
}

//edit a product
exports.editProduct = async (req, res, next) => {

    const {title, description, price, imageUrl, quantity} = req.body;
    const priceTo = parseFloat(price);
    const quantityTo = parseFloat(quantity);
        
    try{
        if(isNaN(quantityTo) || isNaN(priceTo) || priceTo <= 0 || quantityTo % 1 !== 0 || quantityTo < 0 ) {
            throwError('Enter Valid Data', 400);
        }
        const updated = await updateProduct({
           id: req.product.id,
           title,
           description,
           image_url: imageUrl,
           price: priceTo.toFixed(2),
           quantity: quantityTo
        });

        if(updated.rows.length === 0) {
            throwError("Database Connection Error", 500);
        }
        return res.status(201).send(`Product with id ${req.product.id} updated`);    
   
    } catch(err) {
        next(err);
    }
}

//delete a product
exports.deleteProduct = async (req, res, next) => {
    try{
        const deleted = await deleteSingleProduct(req.product.id);
        if(deleted.rows.length === 0) {
            throwError("Database Connection Error", 500);
        }
        return res.status(204).send();
    } catch(err) {
        next(err);
    }
}