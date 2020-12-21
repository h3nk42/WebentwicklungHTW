import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useHistory, withRouter} from 'react-router-dom';

function RegistrationForm() {

    let [data, setData] = useState(null);
    let [tokenData, setTokenData] = useState(null);
    let [taskData, setTaskData] = useState(null);
    let [userData, setUserData] = useState(null);
    let [userName, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

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

    function renderUserData() {
        return userData.map((e) => {
            return <h3 style={{color: 'red'}}
                       key={e._id}> {`${e.userName} // userId: ${e._id} // plan: ${e.plan} `} </h3>
        })
    }

    function createUser(e) {
        e.preventDefault();
        let res = axios({
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
            <p className="card-subtitle mb-5">Already have an account? <a href="/login">Sign in here</a>
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
            {/*{*/}
            {/*    userData ?*/}
            {/*        renderUserData()*/}
            {/*        :*/}
            {/*        null*/}
            {/*}*/}
        </div>
    );
}

export default withRouter(RegistrationForm);