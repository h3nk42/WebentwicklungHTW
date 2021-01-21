import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {useTranslation} from "react-i18next";

function Impressum() {

    const {t, i18n} = useTranslation();

    return (
        <div>
            <Header/>
            <div className="col-12 text-center mt-5">
                <h2>Impressum page</h2>
                <p>{t("datenschutz")}</p>
            </div>
            <Footer/>
        </div>
    )
}

export default Impressum;
