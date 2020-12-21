import React from 'react';
import logo from '../logo/DYDsponge24_logo_only.png'

function LandingPage() {

    return (
        <div className="container backdrop my-4">
            <div className="col-md-12 d-flex align-items-center flex-column">
                <img src={logo} className="" alt="DoYourDishes Logo"/>
                <h1 className="display-3 mb-4 mx-auto">DoYourDishes</h1>
                <a href="/register" className="btn btn-primary my-2">CREATE NEW ACCOUNT</a>
                <a href="/login" className="btn btn-outline-primary btn-md">LOG IN</a>
            </div>
        </div>
    );
}

export default LandingPage;