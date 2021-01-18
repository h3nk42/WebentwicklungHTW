import React from 'react';
import LoginForm from "../components/loginForm/LoginForm";

function Login() {
    return (
        <div className="container my-4">
            <div className="col-md-12 d-flex align-items-center flex-column">
                <LoginForm/>
            </div>
        </div>
    );
}

export default Login;