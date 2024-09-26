const pool = require('./database');

//get all orders
const fetchOrders = (userId) => pool.query('SELECT id, order_date as date, order_total as total FROM orders WHERE user_id = $1', [userId]);

//find order by userid and order id
const findOrderByUserId = (orderId, userId) => pool.query('SELECT id, order_date as date, order_total as total FROM orders WHERE id = $1 AND user_id = $2', [orderId, userId]);

//find order by order id
const findOrderById = (orderId) => pool.query('SELECT id, order_date as date, order_total as total FROM orders WHERE id = $1', [orderId]);

//get single order data
const fetchSingleOrder = (orderId) => {
    return pool.query("SELECT products.id as id, products.title as name, orders_products.ordered_quantity as quantity FROM products JOIN orders_products ON products.id = orders_products.product_id WHERE order_id = $1", [orderId]);
}

module.exports = { fetchOrders, findOrderById, findOrderByUserId, findOrderByUserId }; 