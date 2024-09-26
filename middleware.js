const { validationResult } = require('express-validator');
const { throwError } = require('./utils');
const { getCartId } = require('./model/cart');

exports.checkValidationResults = (req, res, next) => {
    const result = validationResult(req);    
    if(!result.isEmpty()) {
        let errMessage = '';
        result.errors.forEach((errObj) =>{
            errMessage += `${errObj.type} ${errObj.path}: ${errObj.msg}\n`
        } )
        return throwError(errMessage, 400);
    } else {
        return next();
    }
}

exports.isLoggedIn = (req, res, next) => {
    console.log('authen', req.isAuthenticated());
    if(!req.isAuthenticated()){
        throwError('You must be Signed in first');
        return res.redirect('/login');
    }
    console.log('loged', req.isAuthenticated());
    return next();
}

exports.isAccountOwner = (req, res, next) => {
    if(req.user.id !== req.accountId) {
        throwError("You are not authorized", 400);
    } else {
        return next();
    }
}

exports.setCartId = async (req, res, next) => {
    const userId = parseInt(req.user.id);
    const cart = await getCartId(userId);
    req.cartId = cart.rows[0].id;
    return next();
}


exports.viewSession = (req, res, next) => {
    
}