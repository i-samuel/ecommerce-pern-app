const pool = require('./database');

//find address by user_id and address id
const addressByUserAndId = (userId, addressId) => pool.query('SELECT * FROM user_address WHERE user_id = $1 AND id = $2', [userId, addressId]);


//fetch default shipping address
const fetchDefaultAddress = (userId) => pool.query('SELECT id FROM user_address WHERE user_id = $1 AND is_default_shipping = true', [userId]);

//add new address to db ++
const addNewAddress = (dataObj, newAddressUserId) => {
    const { firstName, lastName, address1, address2, city, state, postalCode, country, isDefault } = dataObj;
    
    return pool.query('INSERT INTO user_address (user_id, first_name, last_name, address_1, address_2, city, state, postal_code, country, is_default_shipping) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id', [newAddressUserId, firstName, lastName, address1, address2, city, state, postalCode, country, isDefault]);
}

//change current default address and add new address making the new address default ++
const addNewAddressDefault = async (defaultAddressId, newAddressUserId, newAddressObj) => {

    const { firstName, lastName, address1, address2, city, state, postalCode, country} = newAddressObj;

    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        const updated = await client.query('UPDATE user_address SET Is_default_shipping = false WHERE id = $1 returning *', [defaultAddressId]);
        
        const newAddress = await client.query('INSERT INTO user_address (user_id, first_name, last_name, address_1, address_2, city, state, postal_code, country, is_default_shipping) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true) RETURNING id', [newAddressUserId, firstName, lastName, address1, address2, city, state, postalCode, country]);

        if (updated.rows.length === 0 || newAddress.rows.length === 0) {
            throw new Error("Database Connection Error");
        }

        await client.query('COMMIT');
        return newAddress;
    } catch(e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

//change current default address is_default_shipping to false and update editing address to default with transaction
const changeDefaultAddress = async (defaultAddressId, newDefaultAddressId, updateAddressObj) => {

    const { firstName, lastName, address1, address2, city, state, postalCode, country} = updateAddressObj;

    const client = await pool.connect();
    try{
        await client.query('BEGIN');
        //set isDefault to false of current        
        const defUpdated = await client.query('UPDATE user_address SET Is_default_shipping = false WHERE id = $1 RETURNING id', [defaultAddressId]);
        
        //update new address and make it default
        const updated = await client.query('UPDATE user_address SET first_name = $1, last_name = $2, address_1 = $3, address_2 =$4, city = $5, state = $6, postal_code = $7, country = $8, is_default_shipping = true WHERE id = $9 RETURNING *', [firstName, lastName, address1, address2, city, state, postalCode, country, newDefaultAddressId]);

        if(defUpdated.rows.length === 0 || updated.rows.length === 0){
            throw new Error("Database Connection Error");
        }
        await client.query('COMMIT');
        return updated;
    } catch(e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}    

//update an address
const updateAddress = async (addressId, isDefault, addressObj) => {
    try{
    const { firstName, lastName, address1, address2, city, state, postalCode, country} = addressObj;
  
    const updated = await pool.query('UPDATE user_address SET first_name = $1, last_name = $2, address_1 = $3, address_2 =$4, city = $5, state = $6, postal_code = $7, country = $8, is_default_shipping = $9 WHERE id = $10 RETURNING id', [firstName, lastName, address1, address2, city, state, postalCode, country, isDefault, addressId]);

    if (updated.rows.length === 0){
        throw new Error("Database Connection Error");
    }
    return updated.rows[0].id;
    } catch (e) {
        throw e;
    }
}

//remove an address
const removeAddress = (addressId) => pool.query('DELETE FROM user_address WHERE id = $1 RETURNING *', [addressId]);

module.exports = { addressByUserAndId, fetchDefaultAddress, addNewAddress, addNewAddressDefault, changeDefaultAddress, updateAddress, removeAddress };