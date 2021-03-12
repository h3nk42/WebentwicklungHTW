import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import UsersCards from "./UsersCards";
import {useAuth} from "../../context/auth";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import "./myPlan.css";


function UsersComponent(props) {


    const {t} = useTranslation();

    let history = useHistory();
    const [showUsers, setShowUsers] = useState(false);
    const handleCloseUsers = () => setShowUsers(false);
    const handleShowUsers = () => setShowUsers(true);


    const API_URL = process.env.REACT_APP_API_URL;
    const {user,token} = useAuth();
    let [newUserNameAdded, setNewUserNameAdded] = useState("");


    function handleNewUserNameAdded(event) {
        setNewUserNameAdded(event.target.value);
    }


    function addUserToPlan() {
        props.setIsLoading(true);
        const data = {userName: newUserNameAdded};
        const headers = {Authorization: `Bearer ${token}`};
        axios.post(`${API_URL}plan/addUser`, data, {headers})
            .then(response => {
                console.log(response);
                props.setIsLoading(false);
                props.fetchData();
            })
            .catch(error => {
                const e = error.json
                console.log("Error " + e);
                props.setIsLoading(false);
                alert("You are not the owner")
            })

    }


    function stateModalAddUsers() {
        return (
            <Modal
                show={showUsers}
                onHide={handleCloseUsers}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className="modal-header">
                    <p className="modal-text">{t("userList")}</p>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <input className="modal-input" type="text" value={newUserNameAdded}
                           onChange={handleNewUserNameAdded}/>
                    <ul>
                        {renderAllUsersWithoutPlan()}
                    </ul>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button className="modal-button" onClick={addUserToPlan}>+</button>
                    {props.isLoading ? <LoadingSpinner/> : <div/>}
                </Modal.Footer>
            </Modal>
        )
    }

    function renderAllUsersWithoutPlan() {
        return (
            <div>
                <ol className="allUsersWithoutPlan-Text">
                    {props.allUsersWithoutPlan.map((user) => <li key={user._id}>{user}</li>)}
                </ol>
            </div>
        )
    }


    function handleDeleteUser(delUserName) {
        if(delUserName === props.owner){
            handleDeletePlan();
        }else{
            props.setIsLoading(true);
            const data = {userName: delUserName};
            const headers = {Authorization: `Bearer ${token}`};
            axios.post(`${API_URL}plan/removeUser`, data, {headers})
                .then(response => {
                    console.log(response);
                    props.setIsLoading(false);
                    props.fetchData();
                    if (user.userName === delUserName) {
                        history.push("/home");
                    }
                })
                .catch(error => {
                    const e = error.json
                    console.log("Error " + e);
                    props.setIsLoading(false);
                    alert("You are not the owner")
                })
        }
    }

    function handleDeletePlan(){
        props.setIsLoading(true);
        const headers = {Authorization: `Bearer ${token}`};
        axios.delete(`${API_URL}plan/delete`, {headers})
            .then(response => {
                props.setIsLoading(false);
                history.push("/home");
            })
            .catch(error => {
                console.log(error);
                alert("You are not the owner")
                props.setIsLoading(false);
            })
    }


    function renderAllUsersOfPlanCards() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {props.allUsersOfPlan.map((user) =>
                    <div style={{marginLeft: '10px', marginTop: '5px'}}>
                        <UsersCards userName={user.userName} handleDeleteUser={handleDeleteUser}/>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="container backdrop my-4">
            <div className="col-md-12 d-flex align-items-center flex-column">
                <div className="card p-4 col-12 col-lg-4 myPlan-card addPlan-style">
                    <h2 className="tab-task-title">
                        <strong>{t("users")}</strong>
                        <button className="add-user-button" onClick={handleShowUsers}>+</button>
                        <button  onClick={handleDeletePlan} className="delete-plan-btn"> &#128465;</button>
                        {stateModalAddUsers()}
                    </h2>
                    <h1 className="tab-task-owner"> {t("owner")}: {props.owner}</h1>
                    <div className="row">
                        <ul>
                            {renderAllUsersOfPlanCards()}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default UsersComponent;