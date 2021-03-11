import React from 'react';
import Header from "../components/header/Header";
import ProfileCard from "../components/profile/ProfileCard";
import Footer from "../components/footer/Footer";
import useGetHasPlan from "../hooks/useGetHasPlan";

function Profile() {

    const {hasPlan} = useGetHasPlan();

    return (
        <div>
            <Header hasPlan={hasPlan}/>
            <div className="container my-4">
                <div className="col-md-12 d-flex align-items-center flex-column">
                    <ProfileCard/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;
