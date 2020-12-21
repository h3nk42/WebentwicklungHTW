import React from 'react';
import {useHistory} from 'react-router-dom';

function Header() {
    const body = document.querySelector("body");

    // Dark Mode Action
    let darkMode = localStorage.getItem("darkMode");

    // Enable Dark Mode
    const enableDarkMode = () => {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    };

    // Disable Dark Mode
    const disableDarkMode = () => {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", null);
    };

    if (darkMode === "enabled") {
        enableDarkMode();
    }

    const getDarkMode = () => {
        darkMode = localStorage.getItem("darkMode");
        darkMode !== "enabled" ? enableDarkMode() : disableDarkMode();
    };

    const history = useHistory();

    const logout = () => {
        localStorage.setItem('user', null);
        history.push("/");
    }

    return (
        <nav className="navbar navbar-light header mt-3">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">DoYourDishes</span>
                <button
                    className="dark-mode-button top-dark-mode-button"
                    aria-label="dark mode toggle"
                    onClick={getDarkMode}
                >
                    <span aria-hidden="true" className="dark-toggle">
                         <span className="DTSpan"></span>
                    </span>
                </button>
                <button className="btn btn-primary"
                        style={{height: '50px'}}
                        onClick={logout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Header;