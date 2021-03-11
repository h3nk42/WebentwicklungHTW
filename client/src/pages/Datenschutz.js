import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {useTranslation} from "react-i18next";
import useGetHasPlan from "../hooks/useGetHasPlan";

function Datenschutz() {

    const {t} = useTranslation();
    const {hasPlan} = useGetHasPlan();

    return (
        <div>
            <Header hasPlan={hasPlan}/>
            <div className="col-12 text-center mt-5">
                <h2>Datenschutz page</h2>
                <p>{t("datenschutz")}</p>
            </div>
            <Footer/>
        </div>
    )
}

export default Datenschutz;
