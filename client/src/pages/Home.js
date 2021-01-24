import React, {useState} from 'react';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {useAuth} from "../context/auth";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from "../components/LoadingSpinner";
import useGetHasPlan from "../hooks/useGetHasPlan";


function Home() {

    const {user,token} = useAuth();
    const {hasPlan,setHasPlan} = useGetHasPlan();
    const API_URL = process.env.REACT_APP_API_URL;



    let [userPlanName, setUserPlanName] = useState(" ");
    let [loading, setLoading] = useState(false);


    function createPlan() {
        setLoading(true);
        axios({
            method: 'post',
            url: `${API_URL}plan/create`,
            data: {name: userPlanName},
            headers: {Authorization: `Bearer ${token}`}
        }).then(
            res => {
                setLoading(false);
                console.log(res.data);
                setHasPlan(true);
            }
        ).catch(e => {
            console.log(e);
            setHasPlan(true);
            setLoading(false);
        });
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
            <Header hasPlan={hasPlan}/>
            <div data-testid="homecard" className="container backdrop my-4">
                <div className="col-md-12 d-flex align-items-center flex-column">
                    <div className="card p-4 col-12 col-lg-4 addPlan-card addPlan-style">
                        <h2 className="card-title mt-4"> Welcome <strong>{user.userName}</strong> </h2>
                        <div className="col-md-12 d-inline-flex flex-column my-auto">
                            <div className="card p-4 col-12 col-lg-4 addPlan-sm-style">
                                <button data-testid="addPlanTest" onClick={handleShow} className="button-plan">
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
