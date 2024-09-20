const pool = require('./database');

//get all users
const fetchAllUsers = () => pool.query('SELECT id, username, first_name, last_name, email FROM users');

//get user by id
const findUserById = (id) => pool.query('SELECT id FROM users where id = $1',[id]);

//check User By UserName
const findByUsername = (username) => pool.query('SELECT id FROM users where username = $1',[username]);

//find user by email
const findByEmail = (email) => pool.query('SELECT id FROM users where email = $1',[email])

//to check whether the email exists on other accounts other than current account
const findByEmailNot = (email, id) => pool.query('SELECT id FROM users where email = $1 AND id != $2', [email, id]);

//add a new user to db while registering, also creating cart for the user
const addUserToDb = async ({ username, firstName, lastName, email, password}) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const addedUserId = await client.query('INSERT INTO users (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING id', [firstName, lastName, email, username, password]);
        
        const addCart = await client.query(`INSERT INTO cart (user_id) VALUES (${addedUserId.rows[0].id}) RETURNING id`);
       
        if(addedUserId.rows.length === 0 || addCart.rows.length === 0){
            throw new Error("Database Connection Error");
        }        
        await client.query('COMMIT');
        return addedUserId.rows[0].id;
    } catch(e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
};

//get user info from users table
const fetchUserInfo = async (userId) => pool.query('SELECT id, username, first_name, last_name, email FROM users WHERE id = $1', [userId]);

//get all addresses related to a single user
const fetchUserAddresses = async (userId) => pool.query('SELECT id, first_name, last_name, address_1, address_2, city, state, postal_code, country, is_default_shipping AS isdefault FROM user_address WHERE user_id = $1 ORDER BY id DESC', [userId]);

//update user info in user table
const updateUserInfo = (id, firstName, lastName, email) => pool.query('UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING id, first_name, last_name, email', [firstName, lastName, email, id]);

//change password
const updatePassword = (id, password) => pool.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING id', [password, id]);


module.exports = { findByEmail, findByUsername , addUserToDb, findUserById, fetchAllUsers, findByEmailNot, updatePassword, updateUserInfo, fetchUserInfo, fetchUserAddresses };