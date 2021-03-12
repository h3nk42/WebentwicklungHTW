import React, {useEffect, useState} from 'react';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {useAuth} from "../context/auth";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from "../components/LoadingSpinner";
import useGetHasPlan from "../hooks/useGetHasPlan";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import "../components/loginForm/spinner.css";


function Home() {

    const {user,token} = useAuth();
    const {hasPlan,setHasPlan} = useGetHasPlan();
    const API_URL = process.env.REACT_APP_API_URL;
    const headers = {Authorization: `Bearer ${token}`};

    const {t} = useTranslation();


    let [userPlanName, setUserPlanName] = useState(" ");
    let [loading, setLoading] = useState(true);



    function createPlan() {
        setLoading(true);
        axios({
            method: 'post',
            url: `${API_URL}plan/create`,
            data: {name: userPlanName},
            headers: {Authorization: `Bearer ${token}`}
        }).then(
            res => {
                console.log(res.data);
                setHasPlan(true);
            }
        ).catch(e => {
            console.log(e);
            setHasPlan(true);
        });
        setLoading(false);
    }

    function handleUserPlan(event) {
        setUserPlanName(event.target.value);
    }


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function stateModal() {
        if (hasPlan) {
            return (
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton className="modal-header">
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <p className="modal-text">{t("youHavePlan")}</p>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                    </Modal.Footer>
                </Modal>
            )
        }
        return (
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className="modal-header">
                    <p className="modal-text">{t("addPlanTitle")}</p>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <input className="modal-input" type="text" value={userPlanName} onChange={handleUserPlan}/>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button className="modal-button" onClick={createPlan}>+</button>
                    {loading ? <LoadingSpinner /> : <div/>}
                </Modal.Footer>
            </Modal>
        )
    }


    useEffect(() => {
        axios.get(`${API_URL}plan/showOne`,{headers}).then(res => {
            setLoading(false);
        }).catch(error => {
            setLoading(false);
        })
    })

    if(loading){
        return <div className="spin"></div>
    }

    return (
        <div>
            <Header data-testid="header" hasPlan={hasPlan}/>
            {
                hasPlan ?
                    <div data-testid="homecard" className="container backdrop my-4">
                        <div className="col-md-12 d-flex align-items-center flex-column">
                            <div className="card p-4 col-12 col-lg-4 addPlan-card addPlan-style">
                                <h2 className="card-title mt-4"> {t("welcome")}
                                    <strong>{user?.userName}</strong></h2>
                                <div className="col-md-12 d-inline-flex flex-column my-auto">
                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <p> {t("youHaveAPlanMessage")}
                                            <NavLink
                                                exact
                                                to="/myPlan"
                                            >
                                                {t("myPlan")}
                                            </NavLink>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div data-testid="homecard" className="container backdrop my-4">
                        <div className="col-md-12 d-flex align-items-center flex-column">
                            <div className="card p-4 col-12 col-lg-4 addPlan-card addPlan-style">
                                <h2 className="card-title mt-4"> {t("welcome")}
                                    <strong>{user?.userName}</strong></h2>
                                <div className="col-md-12 d-inline-flex flex-column my-auto">
                                    <div className="card p-4 col-12 col-lg-4 addPlan-sm-style">

                                        <button data-testid="addPlanTest" onClick={handleShow}
                                                className="button-plan">
                                            +
                                        </button>
                                        {stateModal()}
                                    </div>
                                </div>
                                <p className="addPlan-note"
                                   data-testid="addPlanButtonMessage">{t("addPlanButtonMessage")}</p>
                            </div>
                        </div>
                    </div>
            }
            <Footer/>
        </div>
    );
}

export default Home;
