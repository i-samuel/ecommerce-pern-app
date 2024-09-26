const { getCartId, updateOrderStatus, deleteAllCartItems } = require('../model/cart');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//use env for production later
//for local use the current stripe webhook signing secret

exports.stripeSuccess = async (req, res, next) => {
    try{
        let event;
        const signature = req.headers['stripe-signature'];

        //verify stripe signature
        try {
            event = await stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_SUCCESS_WEBHOOK_SECRET);
          }
          catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
       
        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const { order_id, customer_id } = event.data.object.metadata;
                const orderId = parseInt(order_id);
                const userId = parseInt(customer_id);

                //immediately send the response to stripe
                res.json({received: true});

                /* removed below validations, because stripe validation is done
                if(isNaN(orderId) || isNaN(userId)){
                    return throwError('invalid metadata', 400); 
                }

                const orderExists = await findOrderById(orderId, userId);
        
                if(orderExists.rows.length === 0){
                    return throwError('invalid Order data', 400);
                }*/

                const cartId = await getCartId(userId);

                await updateOrderStatus(orderId, 'paid');                
                await deleteAllCartItems(cartId.rows[0].id);

            break;

            // ... handle other event types
            default:
            res.status(404).json({received: true});
        }

        return;

    } catch(err) {
        console.log(err);
    }    
}