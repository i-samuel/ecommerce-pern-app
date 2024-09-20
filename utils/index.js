const bcrypt = require('bcrypt');
const validator = require('validator');

exports.passwordHash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch(err) {
        throw err;
    }
    
}

exports.throwError = (message, status) => {
    const err = new Error(message);
    err.status = status;
    throw err;
}

exports.isValidAddress = (addressObj)=> {

    const {firstName, lastName, address1, address2, city, state, postalCode, country} = addressObj;

    return true;

}

