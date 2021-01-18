import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function MyPlan() {
    return (
        <div>
            <Header/>
            <div className="col-12 text-center mt-5">
                <h2>This is the MyPlan page</h2>
            </div>
            <Footer/>
        </div>
    )
}

export default MyPlan;