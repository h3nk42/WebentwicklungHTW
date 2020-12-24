import React from 'react';
import {Link} from 'react-router-dom';
import Header from "../components/Header";
import {useAuth} from "../context/auth";

function Home() {
    const {userName} = useAuth();

    return (
        <div>
            <Header/>
            <div className="col-12 text-center mt-5">
                <h2>Welcome {userName}</h2>
                <Link to="/profile">Profile</Link>
            </div>
        </div>
    );
}

export default Home;