import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import logo from '../../logo/DYDsponge24_logo_only.png'
import {useAuth} from "../../context/auth";
import i18n from "../../i18next";
import {useTranslation} from "react-i18next";
import "./Header.css";
import "./switch.css";
import Modal from 'react-bootstrap/Modal';

import Sun from "../../logo/SwitchLight.png";
import Moon from "../../logo/SwitchDark.png";

function Header({hasPlan}) {

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

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function myPlanAuth() {
        if (hasPlan) {
            return (
                <NavLink className="px-4"
                         exact
                         to="/myPlan"
                >
                    {t("myPlan")}
                </NavLink>
            )
        } else {
            return (
                <>
                    <NavLink
                        onClick={handleShow}
                        className="px-4"
                        exact
                        to="/home"
                    >
                        {t("myPlan")}
                    </NavLink>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton className="modal-header">
                        </Modal.Header>
                        <Modal.Body className="modal-body">
                            <p className="modal-text">{t("youDontHaveAPlanModal")}</p>
                        </Modal.Body>
                        <Modal.Footer className="modal-footer">
                        </Modal.Footer>
                    </Modal>
                </>

            )
        }
    }

    return (
        <nav data-testid="header" className="navbar navbar-light header mt-3">
            <div className="row col-12 d-flex align-items-center text-white">
                <div className="mr-auto">
                    <span className="h4 align-middle">DoYourDishes</span>
                    <img className="icon mr-3" src={logo} alt="DoYourDishes logo"/>
                    <NavLink className="px-4"
                             exact
                             to="/home"
                    >
                        {t("home")}
                    </NavLink>
                    {myPlanAuth()}
                    <NavLink className="px-4"
                             exact
                             to="/profile"
                    >
                        {t("profile")}
                    </NavLink>
                </div>

                <div className="btn-language mx-1">
                    <span data-testid="btn-language-en"
                          onClick={changeLanguage("en")}>
                        EN
                    </span>
                    <span className="mx-2">|</span>
                    <span data-testid="btn-language-de"
                          onClick={changeLanguage("de")}>
                        DE
                    </span>
                </div>

                <button
                    className="dark-mode-button top-dark-mode-button mx-5"
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

                    {t("logout")}

                </button>
            </div>
        </nav>
    );
}

export default Header;