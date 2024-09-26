const express = require('express');
const router = express.Router();
const passport = require('passport');
const { addUser } = require('../controllers/users');
const { body } = require('express-validator');
const { checkValidationResults } = require('../middleware');

/*
router.get('/auth', (req, res) => {
    if(req.isAuthenticated()){
       return res.status(200).json(req.user);
    } else {
        return res.status(400).send();
    }
})*/

//login route
router.post('/login', 
    passport.authenticate('local'), (req, res) => {
        return res.status(200).send();
});

//user register route
router.post('/register', 
    [body('email').isEmail().normalizeEmail(), 
        body('password').trim().isStrongPassword({minLength: 6,minUppercase: 0, minLowercase: 0, minSymbols: 0}), 
        body('username').trim().notEmpty().escape()], 
    checkValidationResults, 
    addUser);

router.delete('/logout', (req, res, next) => {
    try{
        req.logOut((err) => {
            if (err) {return next(err); }
            
        });

        const islogged = req.isAuthenticated();
        if(islogged){
            return res.status(400).send();
        } else {
            return res.status(204).send();
        }
        
    } catch(e) {
        return next(e);
    }
        
});

router.get('/session', (req, res, next) => {
    if(req.isAuthenticated()){
        const user = req.session.passport.user;
        return res.status(200).send({ user });
    } 
    return res.status(404).send();
    
})


module.exports = router;