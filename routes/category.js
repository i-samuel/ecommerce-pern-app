const express = require('express');
const router = express.Router();
const { throwError } = require('../utils');
const { findCategoryById } = require('../model/category');
const validator = require('validator');
const {  body } = require('express-validator');
const { getAllCategories, getByCategory, editCategory, deleteCategory, addNewCategory } = require('../controllers/category');
const { checkValidationResults } = require('../middleware');


router.param('categoryId', async (req, res, next, id) => {
    try {
        console.log(id);
        //check id is integer
        let catId = parseInt(id);
        if(isNaN(catId)){
            throwError('Bad request', 404);
        }
        
        //check if category exists
        const found = await findCategoryById(catId);
        if(found.rows.length > 0){
            req.categoryId = catId;
            next();
        } else {
            throwError('Category Not Found', 404);
        }
    } catch(err) {
        next(err);
    }
})

//get all categories
router.get('/', getAllCategories);

//add new category
router.post('/', [body('category').trim().notEmpty().escape(),], checkValidationResults, addNewCategory);

//get products by category
router.get('/:categoryId', getByCategory);

//edit category
router.put('/:categoryId', [body('category').trim().notEmpty().escape(),], checkValidationResults, editCategory);

//delete category
router.delete('/:categoryId', deleteCategory);

module.exports = router;