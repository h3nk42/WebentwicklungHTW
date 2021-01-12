import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useHistory, NavLink} from 'react-router-dom';
import "./loginForm/LoginForm.css";
import "./loginForm/spinner.css";

function RegistrationForm() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerState, setRegisterState] = useState('');

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const history = useHistory();

    const checkEmptyField = () => {
        if (userName === '' || password === '' || confirmPassword === '') {
            return true;
        } else {
            return false;
        }
    }

    function handleUsernameChange(e) {
        setUserName(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value);
    }

    async function createUser(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setRegisterState("match_error");
        } else {
            setRegisterState("registering");
            let data = {
                password: password,
                userName: userName
            }
            try {
                let res = await axios({
                    method: 'post',
                    url: `${SERVER_URL}user/createUser`,
                    data: data
                });
                if (res.status === 200) {
                    setRegisterState("registered");
                    history.push("/login");
                }
            } catch (e) {
                setRegisterState("error");
            }
        }
    }

    return (
        <div data-testid="register-card" className="card p-4 col-12 col-lg-4 login-card card-style">
            {registerState === "registering" ?
                <div className="spin"></div>
                :
                <>
                    <h2 className="card-title mt-4">Register</h2>
                    <p className="card-subtitle mb-5">Already have an account? <NavLink to="/login">Sign
                        in here</NavLink></p>
                    <form data-testid="registration-form">
                        <div className="form-group text-left">
                            <label>Username :</label>
                            <input className="form-control"
                                   placeholder="Username"
                                   value={userName}
                                   onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label>Password :</label>
                            <input type="password"
                                   className="form-control"
                                   placeholder="Password"
                                   value={password}
                                   onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="form-group mb-5 text-left">
                            <label>Confirm Password :</label>
                            <input type="password"
                                   className="form-control"
                                   placeholder="Confirm Password"
                                   value={confirmPassword}
                                   onChange={handleConfirmPasswordChange}
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block mb-4"
                                onClick={createUser}
                                disabled={checkEmptyField()}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    {registerState === "match_error" && "Passwords do not match!"}
                    {registerState === "error" && "Username is invalid!"}
                </>
            }
        </div>
    );
}

export default RegistrationForm;