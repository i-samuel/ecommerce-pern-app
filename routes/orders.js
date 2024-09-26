const express = require('express');
const { isLoggedIn, isAccountOwner } = require('../middleware');
const { allOrders, singleOrder } = require('../controllers/orders');
const { findOrderById } = require('../model/orders');
const { throwError } = require('../utils');
const router = express.Router({mergeParams: true});

router.use('/', isLoggedIn, isAccountOwner);

router.param('orderId', async (req, res, next, id) => {
    let orderId = parseInt(id);
    try {
        //check if orderid exists for user
        const found = await findOrderById(orderId, req.accountId);
        if(found.rows.length > 0){
            req.order= found.rows[0];
            next();
        } else {
            throwError('Bad request', 400);
        }
    } catch(err) {
        next(err);
    }

})

//get all orders of the user
router.get('/', allOrders);

//get single order info
router.get('/:orderId', singleOrder);

module.exports = router;