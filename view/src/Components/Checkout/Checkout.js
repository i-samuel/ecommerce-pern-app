import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingAccount, loadAccount, selectDefault, selectExtra, selectInfo } from "../../features/account/accountSlice";
import './checkout.css';
import CartSummary from "../CartSummary/CartSummary";
import { selectCartTotal } from "../../features/cart/cartSlice";

export default function Checkout() {

  const [orderShipId, setOrderShipId] = useState('');
  const [newShipObj, setNewShipObj] = useState({});

  const dispatch = useDispatch();
  
  //user info from state
  const personalInfo = useSelector(selectInfo) || null;

  //defaut address
  const defaultShip = useSelector(selectDefault) || null;

  //other addtress(non-default)
  const additionalShipping = useSelector(selectExtra) || null;
  
  const isAccountLoading = useSelector(isLoadingAccount);

  const cartTotal = useSelector(selectCartTotal);  

  console.log('defaultship', defaultShip);

  console.log('add', additionalShipping);
  console.log('addressId', orderShipId);

  console.log('shipAD', newShipObj);

  useEffect(() =>{
    dispatch(loadAccount(1030));
  },[dispatch]);

  useEffect(() => {
    if(defaultShip){
        setOrderShipId(defaultShip.id);
    } else if (!additionalShipping && additionalShipping.length > 0){
        setOrderShipId(additionalShipping[0].id);
    } else {
        setOrderShipId('new');
    }
  }, [defaultShip, additionalShipping]);

  const handleAddressChange = (e) => {
    const val = e.target.value;
    setOrderShipId(val);
  }

  const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewShipObj((prevObj) => ({...prevObj, [name] : value}));
  }

  return (      
        <div className="container px-0">
            <div className="row mt-4 mb-5 mx-1">
              <div className="col-8">
                <h1 className="fs-3 text-uppercase fw-semibold text-center text-sm-start">Checkout</h1>
                <div class="row">
                    <div class="col">
                        <h4 className="fs-4">Contact</h4>
                        {personalInfo? 
                        <p className="fs-6">{`${personalInfo.first_name} ${personalInfo.last_name} (${personalInfo.email})`}</p>
                        : 
                        <p>Loading Data...</p>
                        }
                        
                    </div>
                </div>
                {isAccountLoading ? 'loading Shipping data' :
                <div className="row">
                    <div className="col shipping-col">
                        <h4 className="fs-4">Shipping</h4>
                        <label class="form-label" for="selectAdd">
                            Saved Addresses
                        </label>
                        <select id="selectAdd" value={orderShipId} onChange={handleAddressChange} class="form-select" aria-label="Default select example" >
                            {
                                defaultShip ? 
                                <AddressOption addressObj={defaultShip}></AddressOption>
                                 : ''
                            }
                           
                            {additionalShipping? additionalShipping.map(item => 
                                (<AddressOption addressObj={item}></AddressOption>)) 
                                : ''}
                            <option value="new">Add New Address</option>
                        </select>

                        {orderShipId === 'new' ? 
                        <form>
                            <div class="row">
                                <div class="col-6 mb-3">
                                    <label for="ea_first_name" class="form-label">First Name</label>
                                    <input type="text" class="form-control" id="na_first_name" name="first_name" value={newShipObj.first_name} onChange={handleInputChange} required/>
                                </div>
                                <div class="col-6 mb-3">
                                    <label for="ea_last_name" class="form-label">Last Name</label>
                                    <input type="text" class="form-control" id="na_last_name" name="last_name" value={newShipObj.last_name} onChange={handleInputChange} required/>
                                </div>                        
                            </div>
                            <div class="row">
                                <div class="col mb-3">
                                    <label for="na_address_1" class="form-label">Address 1</label>
                                    <input type="text" class="form-control" id="na_address_1" name="address_1" value={newShipObj.address_1} onChange={handleInputChange} required/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col mb-3">
                                    <label for="na_address_2" class="form-label">Apartment, suite, etc(optional)</label>
                                    <input type="text" class="form-control" id="na_address_2" name="address_2" value={newShipObj.address_2} onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4 mb-3">
                                    <label for="na_city" class="form-label">City</label>
                                    <input type="text" class="form-control" id="na_city" name="city" value={newShipObj.city} onChange={handleInputChange}/>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label for="na_country" class="form-label">Country</label>
                                    <input type="text" class="form-control" id="na_country" name="country" value={newShipObj.country} onChange={handleInputChange}/>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <label for="na_state" class="form-label">State</label>
                                    <input type="text" class="form-control" id="na_state" name="state" value={newShipObj.state} onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col mb-3">
                                    <label for="na_postal_code" class="form-label">Zip Code</label>
                                    <input type="text" class="form-control" id="na_postal_code" name="postal_code" value={newShipObj.postal_code} onChange={handleInputChange} required/>
                                </div>
                            </div>
                            </form>
                            : 
                            ''
                        }
                    </div>
                </div>
              }

              </div>              
              <CartSummary total={cartTotal} shipping={0} tax={0}/>
            </div>
        </div>
    );
}

const AddressOption = ({addressObj}) => {
    return(
        <option value={addressObj.id}>{`${addressObj.first_name} ${addressObj.last_name} - ${addressObj.address_1} ${addressObj.address_1}, ${addressObj.address_2}, ${addressObj.city}, ${addressObj.state} ${addressObj.postal_code}, ${addressObj.country}`}</option>
    )
}