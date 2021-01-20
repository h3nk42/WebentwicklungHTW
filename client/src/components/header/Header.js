import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import logo from '../../logo/DYDsponge24_logo_only.png'
import {useAuth} from "../../context/auth";
import i18n from "../../i18next";
import {useTranslation} from "react-i18next";
import "./Header.css";
import "./switch.css";
import Sun from "../../logo/SwitchLight.png";
import Moon from "../../logo/SwitchDark.png";

function Header() {
    const {darkMode, setDarkMode} = useAuth();
    const history = useHistory();

    const logout = () => {
        localStorage.setItem('user', null);
        history.push("/");
    }

    const changeLanguage = (lang) => {
        return () => {
            i18n.changeLanguage(lang)
            console.log("language changed to " + lang);
        };
    };

    const {t, i18n} = useTranslation();

    return (
        <nav className="navbar navbar-light header mt-3">
            <div className="row col-12 d-flex align-items-center text-white">
                <div className="mr-auto">
                    <span className="h4 align-middle">DoYourDishes</span>
                    <img className="icon mr-3" src={logo} alt="DoYourDishes logo"/>
                    <NavLink className="px-3 text-white"
                             exact
                             to="/home"
                    >
                        {t("home")}
                    </NavLink>
                    <NavLink className="px-3 text-white"
                             exact
                             to="/myPlan"
                    >
                        {t("myPlan")}
                    </NavLink>
                    <NavLink className="px-3 text-white"
                             exact
                             to="/profile"
                    >
                        {t("profile")}
                    </NavLink>
                </div>
                <div className="btn-language mx-1">
                    <span onClick={changeLanguage("en")}>
                        EN
                    </span>
                    <span className="mx-2">|</span>
                    <span onClick={changeLanguage("de")}>
                        DE
                    </span>
                </div>
                <button data-testid="dark-mode-toggle"
                        className="dark-mode-button top-dark-mode-button mx-4"
                        aria-label="dark mode toggle"
                        onClick={setDarkMode}
                >
                    <span aria-hidden="true" className="dark-toggle">
                        <img data-testid={darkMode === "dark" ? "dark-logo" : "light-logo"}
                             className="DTSpan"
                             src={darkMode === "dark" ? Moon : Sun}
                             alt="theme logo"/>
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
