const express = require('express');
const router = express.Router({mergeParams: true});
const { body } = require('express-validator');
const { checkValidationResults, isLoggedIn, isAccountOwner} = require('../middleware');
const { addNewAddress, editAddress, deleteAddress } = require('../controllers/address');
const { throwError } = require('../utils');
const { addressByUserAndId } = require('../model/address');

//validate adddress
const addressCheckArr = [ body('firstName').trim().notEmpty().escape(), 
        body('lastName').trim().notEmpty().escape(), 
        body('address1').trim().notEmpty().escape(),
        body('city').trim().notEmpty().escape(),
        body('state').trim().notEmpty().escape(),
        body('postalCode').trim().notEmpty().escape(),
        body('country').trim().notEmpty().escape(),
        body('isDefault').trim().notEmpty().escape()]; 

router.use('/', isLoggedIn, isAccountOwner);

router.param('addressId', async (req, res, next, id) => {
        let addressId = parseInt(id);
        try {
            //check if address exists for the current user
            const found = await addressByUserAndId(req.accountId, addressId);        
            if(found.rows.length > 0){                
                req.address= { id: found.rows[0].id, 
                        defaultShipping: found.rows[0].is_default_shipping };
                next();
            } else {
                throwError('Address for the User Not Found', 404);
            }
        } catch(err) {
            next(err);
        }
})    

//add new address to the user
router.post('/',         
        addressCheckArr,
        checkValidationResults,
        addNewAddress);

//edit address
router.put('/:addressId', 
        addressCheckArr,
        checkValidationResults,
        editAddress);

//delete address
router.delete('/:addressId', deleteAddress)

module.exports = router;