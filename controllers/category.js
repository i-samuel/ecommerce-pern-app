const { findProductsByCategory, getCategories, updateCategory, deleteCategory, addCategory } = require("../model/category");
const { throwError } = require("../utils");

//add new category
exports.addNewCategory = async (req, res, next) => {
    try{
        const results = await addCategory(req.body.category);
        if(results.rows.length === 0) {
            throwError('Adding New Category Failed', 400);
        }
        return res.status(201).send(`New Category ${req.body.category} added with id ${results.rows[0].id}`);
    } catch(err) {
        next(err);
    }
}

//get products by Category
exports.getByCategory = async (req, res, next) => {
    try {
        const results = await findProductsByCategory(req.categoryId);
        if(results.rows.length == 0){
            throwError('No Products Found for Category', 404);   
        }
        return res.status(200).json({ products: results.rows });
    } catch(err) {
        next(err);
    }
}

//get all categories
exports.getAllCategories = async (req, res, next) => {
    try {        
        const results = await getCategories();
        if(results.rows.length == 0){
            throwError('No Categories Found', 404);   
        }
        return res.status(200).json({categories: results.rows});
    } catch(err) {
        next(err);
    }
}

//edit category
exports.editCategory = async (req, res, next) => {
    try { 
        const category = req.body.category;
        const updated = await updateCategory(req.categoryId, category);
        if(updated.rows.length === 0){
            throwError("Database Connection Error")
        }
        return res.status(201).send(`Updated category with id ${req.categoryId}`)
    } catch(err) {
        next(err);
    }
}

//delete category
exports.deleteCategory = async (req, res, next) => {
    try {        
        const deleted = await deleteCategory(req.categoryId);
        if(deleted.rows.length === 0){
            throwError("Database Connection Error")
        }
        return res.status(204).send();
    } catch(err) {
        next(err);
    }
}