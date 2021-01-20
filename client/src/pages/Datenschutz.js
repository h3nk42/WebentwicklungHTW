import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {useTranslation} from "react-i18next";

function Datenschutz() {

    const {t, i18n} = useTranslation();

    return (
        <div>
            <Header/>
            <div className="col-12 text-center mt-5">
                <h2>Datenschutz page</h2>
            </div>
            <Footer/>
        </div>
    )
}

export default Datenschutz;
