import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {useTranslation} from "react-i18next";
import useGetHasPlan from "../hooks/useGetHasPlan";

function Impressum() {

    const {hasPlan} = useGetHasPlan();

    const {t} = useTranslation();

    return (
        <div>
            <Header hasPlan={hasPlan}/>
            <div className="col-12 text-center mt-5">
                <h2>Impressum page</h2>
            </div>
            <Footer/>
        </div>
    )
}

export default Impressum;
