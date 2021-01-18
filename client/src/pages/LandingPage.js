import React from 'react';
import logo from '../logo/DYDsponge24_logo_only.png'
import {useHistory} from "react-router-dom";

function LandingPage() {
    const history = useHistory();

    return (
        <div className="container backdrop my-4">
            <div className="col-md-12 d-flex align-items-center flex-column">
                <img src={logo} className="" alt="DoYourDishes Logo"/>
                <h1 className="display-3 mb-4 mx-auto">DoYourDishes</h1>
                <button
                    className="btn btn-primary my-2"
                    onClick={() => history.push('/register')}
                >
                    Create new account
                </button>
                <button
                    data-testid="login-button"
                    className="btn btn-outline-primary btn-md"
                    onClick={() => history.push('/login')}
                >
                    Log in
                </button>
            </div>
        </div>
    );
}

export default LandingPage;