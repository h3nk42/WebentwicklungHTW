import React, {useContext} from 'react';
import Header from "../components/Header";

function Profile(props) {

    const profileStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    }

    return (
        <div>
            <Header/>
            <div style={{padding: 10}}>
                <div style={profileStyle}>
                    <h1>
                        Profile
                    </h1>
                </div>
                <p>Hello <strong>{props.userName}</strong>!</p>
            </div>
        </div>
    )
        ;
}

export default Profile;