//User Login
export const login = async(email, password) => {
    try {
        const res = await fetch('/api/login/', {
            method : 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: email, password})
        });
        if (res.ok) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

//User Register
export const signUp = async(email, username, password) => {
    try{
        const res = await fetch('/api/register/', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, username, password})            
        });
        console.log(res);
        if (res.ok) {            
            return 'success';
        } else {
            const jsonResponse = await res.json();
            return jsonResponse;
        }
    }catch(e) {
        console.log(e);
    }
}

//User Logout
export const logout = async () => {
    try{
        const res = await fetch('/api/logout/', {
            method : 'DELETE', 
            credentials: 'include'          
        });
        console.log(res);
        if (res.ok) {            
            return true;
        } else {
            return false;
        }
    }catch(e) {
        console.log(e);
    }
}

//Fetch if User logged in or not
export const fetchSession = async () => {
    try{
        const res = await fetch('/api/session/', {
            credentials: 'include'
        });
        if (res.ok) {
            const jsonResponse = await res.json();
            return jsonResponse.user;
        } else {
            return null;
        }
    } catch (err) {
        alert('error');
    }
}

//Update Cart item
export const updateCart = async (id, quantity) => {
    try {
        const res = await fetch('/api/cart/', {
            method : 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify({id, quantity})            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }    
}

//Delete item in cart
export const deleteItemCart = async(id) => {
    try {
        const res = await fetch('/api/cart/', {
            method : 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify({id})            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }
}

//Empty Cart
export const emptyCart = async() => {
    try {
        const res = await fetch('/api/cart/empty/', {
            method : 'DELETE',
            credentials: 'include'            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }
}

//update user info
export const updateUser = async (userId, firstName, lastName, email) => {
    try {
        const res = await fetch(`/api/users/${userId}`, {
            method : 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify({firstName, lastName, email})            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }
}

//Update user Address
export const updateAddress = async (userId, addressId, addressObj) => {
    try {
        const res = await fetch(`/api/users/${userId}/address/${addressId}`, {
            method : 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify(addressObj)            
        });    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }    
}

///Add New Address
export const addNewAddress = async (userId, addressObj) => {
    try {
        const res = await fetch(`/api/users/${userId}/address`, {
            method : 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },    
            body: JSON.stringify(addressObj)            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }    
}

//Delete Address
export const deleteAddress = async (userId, addressId) => {
    try {
        const res = await fetch(`/api/users/${userId}/address/${addressId}`, {
            method : 'DELETE',
            credentials: 'include',            
        });
    
        if(res.ok) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e);
    }
}

//Create New Order
export const createNewOrder = async (orderObj) => {
    try{
        const res = await fetch('/api/cart/create-order', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
    
            body: JSON.stringify(orderObj)
        });
        
        if(res.ok) {
            const jsonResponse = await res.json();
            return jsonResponse;
        } else {            
            return null;
        }
    }catch(e) {
        return null;
    }
}

//Update Order Status in server, when payment failed
export const updateFailOrder = async (orderId) => {
    const res = await fetch('/api/payments-checkout/failed-stripe', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({orderId})
    });
    
    if(res.ok) {            
        return true;
    } else {
        
        return false;
    }
}