const { fetchAllUsers, findByEmail, findByUsername , addUserToDb, findByEmailNot, updatePassword, updateUserInfo, fetchUserInfo, fetchUserAddresses } = require('../model/users');

const { throwError, passwordHash } = require('../utils');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await fetchAllUsers();
        if(users.rows.length === 0 ) {
            throwError('No Users Found', 404);
        }
        return res.status(200).json(users.rows);
    } catch(err) {
        next(err);
    }
}

//Register User
exports.addUser = async (req, res, next) => {
    try {      
             
        //check if username and email already exists
        const usernameExists = await findByUsername(req.body.username);
        if(usernameExists.rows.length > 0){
            throwError('Username already exists', 400);
        }
        const emailExists = await findByEmail(req.body.email);
        if(emailExists.rows.length >0){
            throwError('Email already exists', 400);
        }
        //hash password
        const hash = await passwordHash(req.body.password);

        const addedUser = await addUserToDb({...req.body, password: hash});           
        return res.status(201).send(`new user added ${addedUser}`);
    } catch(err) {
        next(err);
    }
}

//get user account info including addresses
exports.getUserInfo = async (req, res, next) =>{
    try {

        //get user info
        const userInfo = await fetchUserInfo(req.accountId);
        if(userInfo.rows.length === 0) {
            throwError('Error Getting data', 400);
        }
        
        //get addresses for the user
        const userAddresses = await fetchUserAddresses(req.accountId);

        let user= {...userInfo.rows[0], 
                    addresses: userAddresses.rows};
        return res.status(200).json( user );
        
    } catch(err) {
        next(err);
    }
}


//edit user account info firstname, last name and email.
//username cannot be changed
//addresses updating handles separately
exports.editUserInfo = async (req, res, next) => {
    try {  
        const { firstName, lastName, email } = req.body;

        //check if email already exists with other accounts other than this account
        const emailExists = await findByEmailNot(email, req.accountId);
        
        if(emailExists.rows.length > 0) { 
            throwError('Email with account already exists', 400)
        };
        
        const updated = await updateUserInfo(req.accountId, firstName, lastName, email);
        
        if(updated.rows.length === 0){
            throwError("Connection Error! Update failed", 400);
        }
        return res.status(201).send('success');

    } catch(err) {
        next(err);
    }
}

//change password
exports.changePassword = async (req, res, next) => {
    try{
        const hash = await passwordHash(req.body.password);
        const changed = await updatePassword(req.accountId, hash);
       
        if(changed.rows.length === 0) {
            throwError("Connection Error! Update failed", 400);
        }
        return res.send('Succesfully changed password');

    } catch(err){
        next(err);
    }
}


