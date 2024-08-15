const express = require('express');
const router = express.Router();
const passport = require('passport');
const { addUser } = require('../controllers/users');
const { body } = require('express-validator');
const { checkValidationResults } = require('../middleware');


router.get('/login', (req, res) => {
    res.send('login page')
})

router.post('/login', 
    passport.authenticate("local", {
        successRedirect: '/products',
        failureRedirect: '/login'}));

router.post('/register', 
    [body('email').isEmail().normalizeEmail(), 
        body('password').trim().isStrongPassword(), 
        body('username').trim().notEmpty().escape()], 
    checkValidationResults, 
    addUser);

router.get('/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) {return next(err); }
            res.redirect('/');
        });
});

module.exports = router;