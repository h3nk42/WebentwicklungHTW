import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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