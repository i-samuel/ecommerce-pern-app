const pool = require("./database");

//get cart id for user
const getCartId = (userId) => {
    return pool.query('SELECT id FROM cart WHERE user_id = $1', [userId]);
};

//get cart product details
const fetchCartItems = (cartId) => {
    return pool.query('SELECT products.id, products.title, products.price, products.image_url, cart_products.cart_quantity FROM products JOIN cart_products ON products.id = cart_products.product_id WHERE cart_id = $1', [cartId]);
};

/*
const fetchItemCount = (cartId) => pool.query('SELECT COUNT(cart_id) from cart_products WHERE cart_id = $1', [cartId]);
*/

const fetchItemCart = (cartId, productId) => {
    return pool.query('SELECT id FROM cart_products WHERE cart_id = $1 AND product_id = $2', [cartId, productId]);
};


//update an item(quantity) already in the cart
const updateCartItem = (rowId, quantity) => pool.query('UPDATE cart_products SET cart_quantity = $1 WHERE id = $2 RETURNING id', [quantity, rowId]);

//add new item to cart
const addCartItem = (cartId, productId, quantity) => {
    return pool.query('INSERT INTO cart_products (cart_id, product_id, cart_quantity) VALUES ($1, $2, $3) RETURNING *', [cartId, productId, quantity]);
}

//remove item from cart
const deleteCartItem = (cartId, productId) => pool.query('DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2 RETURNING *', [cartId, productId]);

//empty cart
const deleteAllCartItems = (cartId) => pool.query('DELETE FROM cart_products WHERE cart_id = $1 RETURNING *', [cartId]);

//create order in orders
//copy products to orders_products
//remove cart_products items
const createOrder = async (cartId, userId, orderTotal, shipId, billId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const order = await client.query('INSERT INTO orders (user_id, order_date, shipping_id, billing_id, order_total) VALUES ($1, to_timestamp($2), $3, $4, $5) RETURNING id', [userId, Date.now()/1000.00, shipId, billId, orderTotal]);
        
        const orderProducts = await client.query('INSERT INTO orders_products (order_id, product_id, ordered_quantity) SELECT $1, product_id, cart_quantity FROM cart_products WHERE cart_id=$2 RETURNING id', [order.rows[0].id, cartId]);

        const deleted = await client.query('DELETE FROM cart_products WHERE cart_id = $1 RETURNING id', [cartId]);
        
        if(orderProducts.rows.length === 0 || deleted.rows.length === 0 || order.rows.length === 0) {
            throw new Error("Database Connection Error");
        } 
        
        await client.query('COMMIT');
        
        return order.rows[0].id;          

    } catch(e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

module.exports = { fetchItemCart, fetchCartItems, getCartId, updateCartItem, addCartItem, deleteCartItem,  deleteAllCartItems, createOrder};