import React, {useState} from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import axios from "axios";
import {useAuth} from "../../context/auth";
import "./spinner.css";
import "./LoginForm.css";

function LoginForm() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loggedInState, setLoggedInState] = useState('');

    const history = useHistory();
    const {setToken} = useAuth();

    async function login(e) {
        e.preventDefault();
        setLoggedInState("logging in");
        let data = {
            password: password,
            userName: userName
        }
        try {
            let res = await axios({
                method: 'post',
                url: `https://doyourdishes.herokuapp.com/api/auth/login`,
                data: data
            });
            if (res.status === 200) {
                setToken(res.data);
                history.push("/home");
            }
        } catch (e) {
            setLoggedInState("error");
        }
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleUserNameChange(event) {
        setUserName(event.target.value);
    }

    return (
        <div className="card p-4 col-12 col-lg-4 login-card card-style">
            {loggedInState === "logging in" ?
                <div className="spin"></div>
                :
                <>
                    <h2 className="card-title mt-4">Sign in</h2>
                    <p className="card-subtitle mb-5">New to DoYourDishes? <NavLink className="navlink" to="/register">Create
                        account</NavLink></p>
                    <form>
                        <div className="form-group text-left">
                            <label>Username :</label>
                            <input className="form-control"
                                   placeholder="Username"
                                   value={userName}
                                   onChange={handleUserNameChange}
                            />
                        </div>
                        <div className="form-group mb-5 text-left">
                            <label>Password :</label>
                            <input type="password"
                                   className="form-control"
                                   placeholder="Password"
                                   value={password}
                                   onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block mb-4"
                                onClick={login}
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                    {loggedInState === "error" && "The username or password provided were incorrect!"}
                </>
            }
        </div>
    );
}

export default LoginForm;