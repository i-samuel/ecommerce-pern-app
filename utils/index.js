const bcrypt = require('bcrypt');
const { isEmpty, trim, escape } = require('validator');

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

    if(!firstName || !lastName || !address1 ||!city ||!state ||!postalCode ||!country) {
        return false;
    }

    for(const item in addressObj){
        if (item !== 'address2' && isEmpty(trim(addressObj[item]))) {
            return false;
        }
    }
    return true;
}

exports.sanitizeAdd = (addressObj) => {
    for(const item in addressObj){            
            addressObj[item] = escape(trim(addressObj[item]));        
    }
    return addressObj;
}

