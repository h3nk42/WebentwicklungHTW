import React, {useState} from 'react';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {useAuth} from "../context/auth";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from "../components/LoadingSpinner";
import useToken from "../hooks/useToken";

function Home() {
    const {userName} = useAuth();
    const {token} = useToken();


    let [userPlanName, setUserPlanName] = useState(" ");
    let [hasPlan, setHasPlan] = useState(false);
    let [loading, setLoading] = useState(false);

    function checkIfUserHasPlan() {
        axios ({
            method: "GET",
            url: "https://doyourdishes.herokuapp.com/api/plan/findPlanToOwner",
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                console.log("[check] Du hast einen Plan " + response.data);
                setHasPlan(true);
                return true;
            })
            .catch(e => {
                console.log("[useHasPlan] Du hast keinen Plan " + e);
                setHasPlan(false);
                return false;
            })
    }

    function createPlan() {
        setLoading(true);
        axios({
            method: 'post',
            url: `https://doyourdishes.herokuapp.com/api/plan/createPlan`,
            data: {name: userPlanName},
            headers: {Authorization: `Bearer ${token}`}
        }).then(
            res => {
                setLoading(false);
                console.log(res.data);
                setHasPlan(true);
                //history.push("/myPlan");
            }
        ).catch(e => {
            // ONLY_ONE_PLAN_PER_USER
            console.log(e);
            setHasPlan(true);
            setLoading(false);
        });
    }

    function handleUserPlan(event) {
        setUserPlanName(event.target.value);
    }

    //Modal
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
                        <p className="modal-text">You have a Plan</p>
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
                    <p className="modal-text">Add your Plan's name</p>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <input className="modal-input" type="text" value={userPlanName} onChange={handleUserPlan}/>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button className="modal-button" onClick={createPlan}>Add Plan</button>
                    {loading ? <LoadingSpinner /> : <div/>}
                </Modal.Footer>
            </Modal>
        )
    }


    return (
        <div>
            <Header hasPlan={hasPlan} checkIfUserHasPlanFun={checkIfUserHasPlan()}/>
            <div className="container backdrop my-4">
                <div className="col-md-12 d-flex align-items-center flex-column">
                    <div className="card p-4 col-12 col-lg-4 addPlan-card addPlan-style">
                        <h2 className="card-title mt-4"> Welcome <strong>{userName}</strong> </h2>
                        <div className="col-md-12 d-inline-flex flex-column my-auto">
                            <div className="card p-4 col-12 col-lg-4 addPlan-sm-style">
                                <button onClick={handleShow} className="button-plan">
                                    +
                                </button>
                                {stateModal()}
                            </div>
                        </div>
                        <p className="addPlan-note">Press "+" to add a new Plan</p>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
}

export default Home;