
const { fetchDefaultAddress, addNewAddress, addNewAddressDefault, changeDefaultAddress, updateAddress, removeAddress } = require('../model/address');
const { throwError } = require('../utils');

exports.addNewAddress = async (req, res, next) => {
    try {
        const { isDefault } = req.body;

        //check if new address is to be set default
        if(isDefault == 'true'){
            //get current default address id
            const currentDefault = await fetchDefaultAddress(req.accountId);

            //if current default address for the user exists 
            if (currentDefault.rows.length > 0) {
                
                //change curent defult address and add new default address with transaction
                const newAddressId = await addNewAddressDefault(currentDefault.rows[0].id, req.accountId, req.body);
                return res.status(200).send(`New default address added with id ${newAddressId.rows[0].id}`);
            }              
            
            //if no current default address, add new address directly with query
            const newAddressId = await addNewAddress({
                                ...req.body,
                                isDefault: true,
                            }, req.accountId);
    
            if(newAddressId.rows.length === 0){
                throwError("Database connection error", 500);
            }
            return res.status(200).send(`New default address added with id ${newAddressId.rows[0].id}`);
        } 

        //if false, create new non default addresses
        const newAddressId = await addNewAddress({
                                    ...req.body,
                                    isDefault: false,
                                }, req.accountId);
        if(newAddressId.rows.length === 0){
            throwError("Database connection error", 500);
        }
        return res.status(200).send(`New address added with id ${newAddressId.rows[0].id}`);
        
    } catch(err) {
        next(err);
    }
}

exports.editAddress = async (req, res, next) => {
    try {
        const { isDefault } = req.body;
        
        //if default address is editing
        if(req.address.defaultShipping === true) {
            const addressId = await updateAddress(req.address.id, true, req.body);
            return res.status(200).send(`Address updated ${addressId}`);            
        }

        //check if a non default address is to be set default
        if(isDefault == 'true' && req.address.defaultShipping === false){
            //get current default address id
            const currentDefault = await fetchDefaultAddress(req.accountId);

            //if current default address for the user exists 
            if (currentDefault.rows.length > 0) {
                
                //change curent default to false and update address and make it default with transaction
                const addressId = await changeDefaultAddress(currentDefault.rows[0].id, req.address.id, req.body);

                return res.status(200).send(`Address Updated ${addressId.rows[0].id}`);
            }              
            
            //if no current default address, update the address and make it default
            const addressId = await updateAddress(req.address.id, true, req.body);
            return res.status(200).send(`Address updated ${addressId}`);
        } 

        //else, update the address normally, making is_default_shipping to false
        const addressId = await updateAddress(req.address.id, false, req.body);
        return res.status(200).send(`Address updated ${addressId}`);

    } catch(err) {        
        next(err);
    }
}

//delete an address
exports.deleteAddress = async (req, res, next) => {
    try {
        const deleted = await removeAddress(req.address.id);
        if(deleted.rows.length === 0 ){
            throwError("Database Connection Error", 500);
        }
        return res.status(204).send();
    } catch(err) {
        next(err);
    }
}

