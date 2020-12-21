import React from 'react';
import Header from "../components/Header";

function Home(props) {
    return (
        <div>
            <Header setDarkMode={props.setDarkMode}/>
            <div className="col-12 text-center mt-5">
                <h2>Welcome {props.userName}</h2>
                <a href="/profile">Profile</a>
            </div>
        </div>
    );
}

export default Home;