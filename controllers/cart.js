const { addressByUserAndId, addNewAddress } = require("../model/address");
const { fetchCartItems, updateCartItem, addCartItem, deleteCartItem, deleteAllCartItems, createOrder } = require("../model/cart");
const { findProductById } = require("../model/products");
const { throwError, isValidAddress } = require("../utils");
const validator = require('validator');

exports.getCartItems = async (req, res, next) => {
    try {        
        const cartItems = await fetchCartItems(req.cartId);
       
        //check if any availble
        if(cartItems.rows.length === 0){
            throwError('No Items in cart', 404);
        }
        //calculate cart Total
        let cartTotal = 0;
        for(let item of cartItems.rows) {
            cartTotal += parseFloat(item.price) * parseFloat(item.cart_quantity);
        }
       
        return res.status(200).json({
            cart: cartItems.rows,
            cartTotal
        });
    } catch(err) {
        next(err);
    }
}

//handle add products to cart and 
//edit quantity of cart product
exports.addToCart = async (req, res, next) => {
    try{        
        const itemId = parseFloat(req.body.id);
        const quantity = parseFloat(req.body.quantity);
        
        //check whether id and quantity is valid
        if(isNaN(itemId) || isNaN(quantity) || itemId < 0 || quantity <= 0 || quantity % 1 !== 0 || itemId % 1 !== 0) { 
            throwError('Bad Request', 400) 
        };
        
        //check if product is valid
        const checkItem = await findProductById(itemId);
        if(checkItem.rows.length === 0) {
            throwError('Product not found', 404);
        }

        //check if ordered quantity available in stock
        if(checkItem.rows[0].quantity === 0) {
            throwError('Product Not Available to Purchase');
        }else if(checkItem.rows[0].quantity < quantity) {
            throwError('Product quantity not Available to Purchase');
        }

        //if product already exists on cart_products, only update the quantity
        const checkAlreadyExists = await fetchItemCart(req.cartId, itemId);

        if(checkAlreadyExists.rows.length > 0) {
            const updated = await updateCartItem(checkAlreadyExists.rows[0].id, quantity);

            if(updated.rows.length === 0) {
                throwError("Conncection Error", 500);
            }
            return res.status(200).send('Cart Updated');

        } else {
            //else add a new item to cart_products
            const added = await addCartItem(req.cartId, itemId, quantity);
            if(added.rows.length === 0 ) {
                throwError('Product failed to add', 400);
            }
            return res.status(201).send('Added Item to Cart');
        }

    } catch(err) {
        next(err);
    }
}

exports.removeCartItem = async (req, res, next) => {
    try{
        const productId = parseFloat(req.body.id);
        //check whether id and quantity is valid
        if(isNaN(productId) || productId < 0 || productId%1 !== 0) { 
            throwError('Bad Request', 400) 
        };

         //if product exists on cart_products
         /*
        const checkAlreadyExists = await fetchSingleProduct(req.cartId, productId);
        if(checkAlreadyExists.rows.length === 0){
            throwError('Bad request', 400);
        } else {
            await deleteCartItem(req.cartId, productId);
            return res.status(204).send('Cart Item removed');
        }*/

        const deleteItem = await deleteCartItem(req.cartId, productId);
        if(deleteItem.rows.length === 0){
            throwError("Bad Request")
        } else {
            res.status(204).send();
        }

    } catch(err) {
        next(err);
    }
}

exports.emptyCart = async (req, res, next) => {
    try{
        /*
        const itemCount = await fetchItemCount(req.cartId);
        if(parseInt(itemCount.rows[0].count) === 0){
            throwError('Bad Request', 400);
        }*/
        const emptyCart = await deleteAllCartItems(req.cartId);
        console.log(emptyCart);
        return res.status(204).send();
    } catch(err) {
        next(err);
    }
}

exports.checkout = async (req,res, next) => {
    try {
        let shippingId;
        let billingId;

        if(!req.body.shipping.id || !req.body.billing.sameAsShipping || !req.body.billing.id) {
            throwError("Bad Request", 400);
        }

        //set shipping address
        //user can choose already existing address id or add new address.
        const { id: reqShipAddressId } = req.body.shipping;
        
        //check if new address to be added
        if(reqShipAddressId == "new"){

            if(!isValidAddress(req.body.shipping)){
                throwError("Please check data again", 400);
            }
            const newshipAddress = await addNewAddress({...req.body.shipping, isDefault: false}, req.user.id);
            //add error in model
            shippingId = newshipAddress.rows[0].id;

        //else if existing address   
        } else {
            const reqShipId = parseInt(reqShipAddressId);
            if(isNaN(reqShipId)){
                throwError('Please check shipping Address Again', 400);
            }
            const shipping = await addressByUserAndId(req.user.id, reqShipId);
            if(shipping.rows.length === 0){
                throwError("Bad Request", 400);
            }
            else {
                shippingId = reqShipId;
            }
        }
        
        //set billing address

        //billing address object of request body
        const reqBilling = req.body.billing;

        //check if bill address same as shipping
        if(reqBilling.sameAsShipping == "true"){
            billingId = shippingId;
        
        } else {
            //check if new address to be added
            if(reqBilling.id == "new"){

                if(!isValidAddress(req.body.billing)){
                    throwError("Please check data again", 400);
                }
                const newbillAddress = await addNewAddress({...req.body.shipping, isDefault: false}, req.user.id);
                //add error in model
                billingId = newbillAddress.rows[0].id;
              
            //else if existing address 
            } else {
                const reqBillId = parseInt(reqBilling.id);
                if(isNaN(reqBillId)){
                    throwError('Please check billing Address Again', 400);
                }
                const billing = await addressByUserAndId(req.user.id, reqBillId);
                if(billing.rows.length === 0){
                    throwError("Bad Request", 400);
                }
                else {
                    billingId = reqBillId;
                }
            }
        }

        //verify payment details
        const { cardNo, expYear, expMonth, cvv } = req.body.PaymentDetails;

        if(!cardNo || !expYear ||!expMonth || !cvv || !validator.isCreditCard(cardNo)){
            throwError("Enter valid payment detais", 400);
        }

        //create order in orders
        //copy products to orders_products
        //remove cart_products items       
        const orderId = await createOrder(req.cartId, req.user.id, req.body.orderTotal, shippingId, billingId);
        
        console.log(orderId);

                
        return res.status(203).send('okay');

    } catch(err){
        next(err);
    }
}

