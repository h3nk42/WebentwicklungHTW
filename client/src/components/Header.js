import React from 'react';
import {useHistory} from 'react-router-dom';
import useDarkMode from "../hooks/useDarkMode";
import logo from '../logo/DYDsponge24_logo_only.png'

function Header({setDarkMode}) {

    const history = useHistory();

    const logout = () => {
        localStorage.setItem('user', null);
        history.push("/");
    }

    return (
        <nav className="navbar navbar-light header mt-3">
            <div className="row col-12 d-flex align-items-center text-white">
                <div className="mr-auto">
                    <span className="h4 align-middle">DoYourDishes</span>
                    <img className="icon" src={logo} alt="DoYourDishes logo"/>
                </div>
                <button
                    className="dark-mode-button top-dark-mode-button"
                    aria-label="dark mode toggle"
                    onClick={setDarkMode}
                >
                    <span aria-hidden="true" className="dark-toggle">
                        <span className="DTSpan"></span>
                    </span>
                </button>
                <button className="btn btn-primary btn-sm"
                        onClick={logout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Header;