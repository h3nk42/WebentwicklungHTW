import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import logo from '../../logo/DYDsponge24_logo_only.png'
import {useAuth} from "../../context/auth";
import i18n from "../../i18next";
import {useTranslation} from "react-i18next";
import "./Header.css";
import "./switch.css";
import Modal from 'react-bootstrap/Modal';

function Header(props) {
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

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function myPlanAuth() {
        console.log("myPlanAuth (props): " + props.hasPlan);
        if(props.hasPlan){
            return(
                <NavLink className="navlink"
                         exact
                         to="/myPlan"
                >
                    MyPlan
                </NavLink>
            )
        } else {
            return (
                <div>
                    <NavLink
                        onClick={handleShow}
                        className="navlink"
                        exact
                        to="/home"
                    >
                        MyPlan
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
                            <p className="modal-text">You dont have a Plan yet, create one</p>
                        </Modal.Body>
                        <Modal.Footer className="modal-footer">
                        </Modal.Footer>
                    </Modal>
                </div>

            )
        }
    }

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
                        {myPlanAuth()}
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
                        <button className="changeLang-button" onClick={changeLanguage("en")}>
                            EN
                        </button>
                        <span className="mx-2">|</span>
                        <button className="changeLang-button" onClick={changeLanguage("de")}>
                            DE
                        </button>
                    </li>
                    <li>
                        <button
                            className="dark-mode-button top-dark-mode-button"
                            aria-label="dark mode toggle"
                            onClick={setDarkMode}
                        >
                    <span aria-hidden="true" className="dark-toggle">
                        <span className="DTSpan"></span>
                    </span>
                        </button>
                    </li>
                    <li>
                        <button className="btn btn-primary btn-sm"
                                onClick={logout}
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