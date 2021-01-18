import React from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {useAuth} from "../../context/auth";
import './Profile.css';
import avatar from '../../logo/profile-picture.png';
import avatarDark from '../../logo/profile-picture-dark.png';

function Profile() {
    const {userName, darkMode} = useAuth();

    return (
        <div>
            <Header/>
            <div className="container my-4">
                <div className="col-md-12 d-flex align-items-center flex-column">
                    <div className="card p-4 col-12 col-lg-4 profile-card profile-style">
                        <div className="row align-items-center justify-content-between mt-2">
                            <h2 className="col-md-4">Profile</h2>
                            <img className="mr-4 avatar" src={darkMode === "dark" ? avatarDark : avatar} alt=""/>
                        </div>
                        <div className="text-left mt-3">
                            <p className="label">Username :</p><p>{userName}</p>
                            <p className="label">Name :</p><p>-</p>
                            <p className="label">Surname :</p><p>-</p>
                            <p className="label">Date of birth :</p><p>-</p>
                            <p className="label">Plan :</p><p>Plan name</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;