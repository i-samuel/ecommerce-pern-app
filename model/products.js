const pool = require('./database');

//get all products
const fetchAllProducts = () => {
    
    return pool.query('SELECT * FROM products')
};

//get single product row
const findProductById = (id) => pool.query('SELECT * FROM products WHERE id=$1', [id]);

//add new product
const addNewProduct = ({title, description, price, image_url, quantity}) => {
    const query = 'INSERT INTO products (title, description, price, image_url, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [title, description, price, image_url, quantity];

    return pool.query(query, values);
}

//update product
const updateProduct = ({id, title, description, price, image_url, quantity}) => {
    return pool.query('UPDATE products SET title = $1, description = $2, price = $3, image_url = $4, quantity = $5 WHERE id = $6 RETURNING *', [title, description, price, image_url, quantity, id]);
}

//remove product 
const deleteSingleProduct = (id) => pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);

module.exports = { fetchAllProducts, addNewProduct, findProductById, deleteSingleProduct, updateProduct };