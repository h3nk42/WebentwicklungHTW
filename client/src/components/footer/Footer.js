import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import "./Footer.css";

function Footer() {

    const {t, i18n} = useTranslation();

    return (
        <nav className="navbar navbar-light footer mb-3">
            <div className="row col-12 d-flex align-items-center text-white">
                <NavLink className="px-3 text-white"
                         exact
                         to="/impressum"
                >
                    {t("impressum_footer")}
                </NavLink>
                <NavLink className="px-3 text-white"
                         exact
                         to="/datenschutz"
                >
                    {t("datenschutz_footer")}
                </NavLink>
            </div>
        </nav>
    );
}

export default Footer;
