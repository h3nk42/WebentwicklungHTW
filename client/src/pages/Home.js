import React from 'react';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {useAuth} from "../context/auth";

function Home() {
    const {userName} = useAuth();

    return (
        <div>
            <Header/>
            <div className="col-12 text-center mt-5">
                <h2>Welcome {userName}</h2>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;