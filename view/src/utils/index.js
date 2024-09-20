export const fetchProducts = async() => {
    try{
        const res = await fetch('/api/products/',{
            
            headers: {
                credentials: 'same-origin',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const jsonResponse = await res.json();
        return jsonResponse;
    } catch (err) {
        console.log(err);
    }
}

export const login = async(email, password) => {
    try {
        const res = await fetch('http://localhost:4001/api/login/', {
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

export const signUp = async(email, username, password) => {
    try{
        const res = await fetch('http://localhost:4001/api/register/', {
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

export const logout = async () => {
    try{
        const res = await fetch('http://localhost:4001/api/logout/', {
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

export const fetchSession = async () => {
    try{
        const res = await fetch('http://localhost:4001/api/session/', {
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

//cart
export const updateCart = async (id, quantity) => {
    try {
        const res = await fetch('http://localhost:4001/api/cart/', {
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

export const deleteItemCart = async(id) => {
    try {
        const res = await fetch('http://localhost:4001/api/cart/', {
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

export const emptyCart = async() => {
    try {
        const res = await fetch('http://localhost:4001/api/cart/empty/', {
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
        const res = await fetch(`http://localhost:4001/api/users/${userId}`, {
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


export const updateAddress = async (userId, addressId, addressObj) => {
    try {
        const res = await fetch(`http://localhost:4001/api/users/${userId}/address/${addressId}`, {
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

export const addNewAddress = async (userId, addressObj) => {
    try {
        const res = await fetch(`http://localhost:4001/api/users/${userId}/address`, {
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

export const deleteAddress = async (userId, addressId) => {
    try {
        const res = await fetch(`http://localhost:4001/api/users/${userId}/address/${addressId}`, {
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