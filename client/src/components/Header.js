import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../logo/DYDsponge24_logo_only.png'

function Header() {

    return (
        <nav className="navbar navbar-light header mt-3">
            <div className="row col-12 d-flex align-items-center text-white">
                <div className="mr-auto">
                    <span className="h4 align-middle">DoYourDishes</span>
                    <img className="icon" src={logo} alt="DoYourDishes logo"/>
                </div>
                <ul>
                    <li>
                        <NavLink className="navlink"
                                 exact
                                 to="/home"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navlink"
                                 exact
                                 to="/myPlan"
                        >
                            MyPlan
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navlink"
                                 exact
                                 to="/profile"
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <button className="btn btn-primary btn-sm"
                        >
                            Logout
                        </button>
                    </li>
                </ul>

            </div>
        </nav>
    );
}

export default Header;