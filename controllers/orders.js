const { fetchOrders, fetchSingleOrder } = require("../model/orders");
const { throwError } = require("../utils");

exports.allOrders = async (req, res, next) => {
    try{
        const orders = await fetchOrders(req.accountId);
        res.status(200).json({orders: orders.rows });
    } catch(err) {
        next(err);
    }
}

exports.singleOrder = async (req, res, next) => {
    try {
        const orderDetails = req.order;
        const products = await fetchSingleOrder(req.order.id);
        if(products.rows.length === 0){
            throwError("Error", 500);
        }
        res.status(200).json({ orderDetails, products : products.rows });
    } catch(err) {
        next(err);
    }
}