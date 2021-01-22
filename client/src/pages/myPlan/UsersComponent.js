import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import useToken from "../../hooks/useToken";
import UsersCards from "./UsersCards";
import {useAuth} from "../../context/auth";
import { useHistory } from "react-router-dom";


function UsersComponent(props) {
    console.log("UsersComponent uip: " + JSON.stringify(props.allUsersOfPlan));
    console.log("Owner  ::::: " + props.owner);


    let history = useHistory();
    const [showUsers, setShowUsers] = useState(false);
    const handleCloseUsers = () => setShowUsers(false);
    const handleShowUsers = () => setShowUsers(true);


    const API_URL = process.env.REACT_APP_API_URL;
    const {token} = useToken();
    let [newUserNameAdded, setNewUserNameAdded] = useState("");
    const {userName} = useAuth();
    console.log("USerName:::: " + userName);


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
                    <p className="modal-text"> List of Users available</p>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <input className="modal-input" type="text" value={newUserNameAdded}
                           onChange={handleNewUserNameAdded}/>
                    <ul>
                        {renderAllUsersWithoutPlan()}
                    </ul>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button className="modal-button" onClick={addUserToPlan}>Add User</button>
                    {props.isLoading ? <LoadingSpinner/> : <div/>}
                </Modal.Footer>
            </Modal>
        )
    }

    function renderAllUsersWithoutPlan() {
        return (
            <div>
                <ol>
                    {props.allUsersWithoutPlan.map((user) => <li key={user._id}>{user}</li>)}
                </ol>
            </div>
        )
    }


    function handleDeleteUser(delUserName) {
            props.setIsLoading(true);
            const data = {userName: delUserName};
            const headers = {Authorization: `Bearer ${token}`};
            axios.post(`${API_URL}plan/removeUser`, data, {headers})
                .then(response => {
                    console.log(response);
                    props.setIsLoading(false);
                    props.fetchData();
                    if(userName === delUserName){
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


    function renderAllUsersOfPlanCards() {
        return (
            <div>
                <ol>
                    {props.allUsersOfPlan.map((user) =>
                        <li key={user._id}>
                            <UsersCards userName={user.userName} handleDeleteUser={handleDeleteUser}/>
                        </li>
                    )}
                </ol>
            </div>
        )
    }

    return (
        <div className="container backdrop my-4">
            <div className="col-md-12 d-flex align-items-center flex-column">
                <div className="card p-4 col-12 col-lg-4 myPlan-card addPlan-style">
                    <h2 className="tab-task-title col-md-12">
                        <strong>Users</strong>
                        <button className="add-user-button" onClick={handleShowUsers}>+</button>
                        {stateModalAddUsers()}
                    </h2>
                    <h1 className="tab-task-owner"> Owner: {props.owner}</h1>
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