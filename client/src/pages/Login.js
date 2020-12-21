import React from 'react';
import LoginForm from "../components/LoginForm";

function Login({setToken}) {
    return (
        <div className="container my-4">
            <div className="col-md-12 d-flex align-items-center flex-column">
                <LoginForm setToken={setToken}/>
            </div>
        </div>
    );
}

export default Login;