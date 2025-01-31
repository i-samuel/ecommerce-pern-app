import React from "react";
import './footer.css';


export default function Footer() {
    return(
        <div className="container-fluid bg-dark text-white">
            
            <div className="container shop-footer py-5">
                <div className="row">
                <div className="col-6 col-md-2 mb-3">
                    <h5>Our Company</h5>
                    <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">About</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Contact</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Our Locations</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Privacy Policy</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Terms</a></li>
                    </ul>
                </div>

                <div className="col-6 col-md-2 mb-3">
                    <h5>Important Links</h5>
                    <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Home</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Shop</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Shipping</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Return Policy</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">FAQs</a></li>
                    </ul>
                </div>

                <div className="col-6 col-md-2 mb-3">
                    <h5>Partnerships</h5>
                    <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Investors</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Delivery Partners</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Affiliates</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0">Influencers</a></li>
                    </ul>
                </div>

                <div className="col-md-5 offset-md-1 mb-3">
                    <form>
                    <h5>Subscribe to Get latest offers!</h5>
                    <p>Monthly digest of what's new and exciting from us.</p>
                    <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                        <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                        <input id="newsletter1" type="text" className="form-control rounded-0" placeholder="Email address"/>
                        <button className="btn btn-primary rounded-0" type="button">Subscribe</button>
                    </div>
                    </form>
                </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                <p>© 2024 ShopReact, Inc. All rights reserved.</p>
                <ul className="list-unstyled d-flex">
                    <li className="ms-3"></li>
                    <li className="ms-3"></li>
                    <li className="ms-3"></li>
                </ul>
                </div>
            </div>
            </div>
    )
}