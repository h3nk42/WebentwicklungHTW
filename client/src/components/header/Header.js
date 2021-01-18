import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import logo from '../../logo/DYDsponge24_logo_only.png'
import {useAuth} from "../../context/auth";
import i18n from "../../i18next";
import {useTranslation} from "react-i18next";
import "./Header.css";
import "./switch.css";

function Header() {
    const {setDarkMode} = useAuth();
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
        <nav data-testid="header" className="navbar navbar-light header mt-3">
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
                <button className="dark-mode-button top-dark-mode-button mx-4"
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