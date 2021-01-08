import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../logo/DYDsponge24_logo_only.png'
import i18n from "../i18next";
import {useTranslation} from "react-i18next";


function Header() {


    const changeLanguage = (lang) => {
        return ()=>{
            i18n.changeLanguage(lang)
            console.log("language changed to " + lang);
        };
    };

    const{t, i18n} = useTranslation();


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
                            <p>{t("home")}</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navlink"
                                 exact
                                 to="/myPlan"
                        >
                            <p>{t("myPlan")}</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navlink"
                                 exact
                                 to="/profile"
                        >
                            <p>{t("profile")}</p>
                        </NavLink>
                    </li>
                    <li>
                        <button className="btn-language"
                                onClick={changeLanguage("en")}>
                            <a>EN </a>
                        </button>
                        <button className="btn-language"
                                onClick={changeLanguage("de")}>
                            <a>DE</a>
                        </button>
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