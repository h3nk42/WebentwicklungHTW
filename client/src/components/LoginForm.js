import React, {useState} from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import axios from "axios";
import {Link} from "react-router-dom";

function LoginForm({setToken}) {
    let [userName, setUserName] = useState('');
    let [password, setPassword] = useState('');
    const history = useHistory();

    // let [loggedInUser, setLoggedInUser] = useState(null);

    async function login(e) {
        e.preventDefault();
        let data = {
            password: password,
            userName: userName
        }
        let res = await axios({
            method: 'post',
            url: `https://doyourdishes.herokuapp.com/api/auth/login`,
            data: data
        });
        console.log(res);
        // setLoggedInUser(userName);
        setToken(res.data);
        history.push("/profile");
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleUserNameChange(event) {
        setUserName(event.target.value);
    }

    return (
        <div className="card p-4 col-12 col-lg-4 login-card card-style">
            <h2 className="card-title">Sign in</h2>
            <p className="card-subtitle mb-5 text-muted">New to DoYourDishes? <a href="/register">Create
                account</a></p>
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
                        className="btn btn-primary btn-block"
                        onClick={login}
                    >
                        Login
                    </button>
                </div>
            </form>
            {/*{*/}
            {/*    !(tokenData === null) ?*/}
            {/*        'token === ' + tokenData*/}
            {/*        :*/}
            {/*        null*/}
            {/*}*/}
            {/*{*/}
            {/*    loggedInUser ?*/}
            {/*        <h1 style={{color: 'green'}}> logged in as: {loggedInUser} </h1>*/}
            {/*        :*/}
            {/*        null*/}
            {/*}*/}
        </div>
    );
}

export default withRouter(LoginForm);