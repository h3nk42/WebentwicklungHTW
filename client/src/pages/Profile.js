import React, {useContext} from 'react';
import Header from "../components/Header";

function Profile(props) {

    return (
        <div>
            <Header/>
            <div className="col-12 text-center mt-5">
                <h2>Hello <strong>{props.userName}</strong>!</h2>
                <a href="/home">Home</a>
            </div>
        </div>
    )
        ;
}

export default Profile;