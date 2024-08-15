const pool = require('./database');

//find category by id
const findCategoryById = (id) => pool.query('SELECT * FROM category WHERE id=$1', [id]);

//get all categories
const getCategories = () => pool.query('SELECT * FROM category');

//get products by Category
const findProductsByCategory = (id) =>{
    return pool.query('SELECT * FROM products JOIN products_category ON products.id = products_category.product_id WHERE products_category.category_id = $1', [id]);
}

//add category
const addCategory = (name) => pool.query('INSERT INTO category (name) VALUES ($1) RETURNING id', [name]);

//update category
const updateCategory = (id, name) => pool.query('UPDATE category SET name = $1 WHERE id = $2 RETURNING *', [name, id]);

//delete category
const deleteCategory = (id) => pool.query('DELETE FROM category WHERE id = $1 RETURNING *', [id]);

module.exports = { addCategory, findCategoryById, findProductsByCategory, getCategories, updateCategory, deleteCategory };


