import React, {useContext} from 'react';
import Header from "../components/Header";

function Profile(props) {

    const profileStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        padding: '10px'
    }

    return (
        <div>
            <Header/>
            <div style={profileStyle}>
                <h1>
                    Profile
                </h1>
            </div>
            <p>Hello <strong>{props.userName}</strong>!</p>
            <a href="/home">Home</a>
        </div>
    )
        ;
}

export default Profile;