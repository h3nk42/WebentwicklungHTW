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

    const API_URL = process.env.REACT_APP_API_URL;
    const history = useHistory();

    const checkEmptyField = () => {
        return userName === '' || password === '' || confirmPassword === '';
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
                    url: `${API_URL}user/create`,
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
                <div className="spin"/>
                :
                <>
                    <h2 className="card-title mt-4">Register</h2>
                    <p className="card-subtitle mb-5">Already have an account?
                        <span data-testid="sign-in"
                              className="btn btn-outline-primary"
                              onClick={() => history.push("/login")}
                        >
                            Sign in here
                        </span>
                    </p>
                    <form data-testid="registration-form">
                        <div className="form-group text-left">
                            <label>Username :</label>
                            <input data-testid="username-register"
                                   type="text"
                                   className="form-control"
                                   placeholder="Username"
                                   value={userName}
                                   onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="form-group text-left">
                            <label>Password :</label>
                            <input data-testid="password-register"
                                   type="password"
                                   className="form-control"
                                   placeholder="Password"
                                   value={password}
                                   onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="form-group mb-5 text-left">
                            <label>Confirm Password :</label>
                            <input data-testid="confirm-password"
                                   type="password"
                                   className="form-control"
                                   placeholder="Confirm Password"
                                   value={confirmPassword}
                                   onChange={handleConfirmPasswordChange}
                            />
                        </div>
                        <div className="text-center">
                            <button
                                data-testid="register-btn"
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
