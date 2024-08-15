const express = require('express');
const router = express.Router({mergeParams: true});
const { check } = require('express-validator');
const { checkValidationResults} = require('../middleware');
const { addNewAddress, editAddress, deleteAddress } = require('../controllers/address');
const { throwError } = require('../utils');
const { addressByUserAndId } = require('../model/address');

//validate adddress
const addressCheckArr = [ check('firstName').trim().notEmpty().escape(), 
        check('lastName').trim().notEmpty().escape(), 
        check('address1').trim().notEmpty(),
        check('city').trim().notEmpty(),
        check('state').trim().notEmpty(),
        check('postalCode').trim().notEmpty(),
        check('country').trim().notEmpty(),
        check('isDefault').trim().notEmpty()]; 

//router.use('/', isLoggedIn, isAccountOwner);

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