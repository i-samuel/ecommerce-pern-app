const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const addressRouter = require('./address');
const ordersRouter = require('./orders');

const { findUserById } = require('../model/users');
const { getAllUsers, changePassword, editUserInfo, getUserInfo } = require('../controllers/users');
const { throwError } = require('../utils');
const { checkValidationResults, isLoggedIn, isAccountOwner } = require('../middleware');

router.use('/:userId', isLoggedIn, isAccountOwner);

router.param('userId', async (req, res, next, id) => {
    let userId = parseInt(id);
    try {
        //check if user exists
        const found = await findUserById(userId);

        if(found.rows.length > 0){
            req.accountId= found.rows[0].id;
            next();
        } else {
            throwError('User Not Found', 404);
        }
    } catch(err) {
        next(err);
    }
})

//adddress router
router.use('/:userId/address', addressRouter);
//orders router
router.use('/:userId/orders', ordersRouter);

//get all users
router.get('/', getAllUsers);

//get user info
router.get('/:userId', getUserInfo);

//edit user info
router.put('/:userId',  
    [body('email').isEmail().normalizeEmail(), body('firstName').trim().notEmpty().escape(), body('lastName').trim().notEmpty().escape() ], 
    checkValidationResults, 
    editUserInfo
);

//edit password
router.put('/:userId/edit', [body('password').trim().isStrongPassword()], checkValidationResults, changePassword);

module.exports = router;