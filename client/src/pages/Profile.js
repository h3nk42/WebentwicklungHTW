import React, {useContext} from 'react';
import Header from "../components/Header";
import {useAuth} from "../context/auth";
import {Link} from "react-router-dom";

function Profile() {
    const {userName} = useAuth();

    return (
        <div>
            <Header/>
            <div className="col-12 text-center mt-5">
                <h2>Hello <strong>{userName}</strong>!</h2>
                <Link to="/home">Home</Link>
            </div>
        </div>
    )
        ;
}

export default Profile;