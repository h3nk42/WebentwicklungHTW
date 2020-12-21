import React from 'react';
import Header from "../components/Header";

function Home(props) {
    return (
        <div>
            <Header/>
            <div className="col-12 mt-5">
                <h2 className="text-center">Welcome {props.userName}</h2>
            </div>
        </div>
    );
}

export default Home;