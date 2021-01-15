
import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";


function Home() {


    return (
        <div>
            <Header/>
            <div className="col-12 text-center mt-5">
                <h2>Welcome </h2>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;