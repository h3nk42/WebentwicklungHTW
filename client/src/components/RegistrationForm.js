import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useHistory, NavLink} from 'react-router-dom';

function RegistrationForm() {

    const [data, setData] = useState(null);
    const [tokenData, setTokenData] = useState(null);
    const [taskData, setTaskData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const history = useHistory();

    let config = {
        headers: {
            Authorization: `Bearer ${tokenData}`
        }
    }

    useEffect(() => {
        fetchData()

        return function cleanup() {
            clearTimeout()
        }
    }, [])

    function fetchData() {
        axios.get(
            'https://doyourdishes.herokuapp.com/api/plan/findAllPlans', config
        )
            .then((response) => {
                setData(response.data.data)
            })
            .catch((e) => {
                console.log(e);
            })

        fetch('https://doyourdishes.herokuapp.com/api/task/findAllTasks')
            .then((data) => data.json())
            .then((res) => {
                setTaskData(res.data)
            })
        fetch('https://doyourdishes.herokuapp.com/api/user/findAllUsers')
            .then((data) => data.json())
            .then((res) => {
                console.log(res.data)
                setUserData(res.data)
            })
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

    function createUser(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: `https://doyourdishes.herokuapp.com/api/user/createUser`,
            data: {userName: userName, password: password}
        }, (err) => {
            if (err) console.log(err)
        });
        setTimeout(fetchData, 500)
        history.push("/login");
    }

    return (
        <div className="card p-4 col-12 col-lg-4 login-card card-style">
            <h2 className="card-title mt-4">Register</h2>
            <p className="card-subtitle mb-5">Already have an account? <NavLink className="navlink" to="/login">Sign in here</NavLink>
            </p>
            <form>
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
                        className="btn btn-primary btn-block"
                        onClick={createUser}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;