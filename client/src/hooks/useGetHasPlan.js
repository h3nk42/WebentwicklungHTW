import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../context/auth";



export default function useGetHasPlan() {

    const {token} = useAuth();
    const API_URL = process.env.REACT_APP_API_URL;
    const headers = {Authorization: `Bearer ${token}`};
    const [hasPlan, setHasPlan] = useState(false);
    const [isLoadingPlan, setIsLoadingPlan] = useState(true);


    useEffect(() => {
        setIsLoadingPlan(true);
        const fetchData = async () => {
            try {
                const result = await axios.get(`${API_URL}plan/showOne`,{headers});
                setHasPlan(true);
            } catch (error) {
                console.log("error");
                setHasPlan(false);
            }
        };
        fetchData();
        setIsLoadingPlan(false);
    },[hasPlan])


    return {
        hasPlan: hasPlan,
        setHasPlan: setHasPlan
    }

}
