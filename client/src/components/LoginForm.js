import React, {useState} from 'react';
import {useHistory, withRouter, Link} from 'react-router-dom';
import axios from "axios";
import {useAuth} from "../context/auth";

function LoginForm() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    const history = useHistory();
    const {setToken} = useAuth();

    async function login(e) {
        e.preventDefault();
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
                console.log(res);
                setToken(res.data);
                history.push("/home");
            } else {
                setIsError(true);
            }
        } catch (e) {
            setIsError(true);
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
            <h2 className="card-title mt-4">Sign in</h2>
            <p className="card-subtitle mb-5">New to DoYourDishes? <Link to="/register">Create
                account</Link></p>
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
            {isError && "The username or password provided were incorrect!"}
        </div>
    );
}

export default withRouter(LoginForm);