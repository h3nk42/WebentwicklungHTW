import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../context/auth";
import useToken from "./useToken";


export default function useGetHasPlan() {

    const {token} = useToken();
    const {userName} = useAuth();
    const API_URL = process.env.REACT_APP_API_URL;
    const headers = {Authorization: `Bearer ${token}`};
    const [hasPlan, setHasPlan] = useState(false);
    const [isLoading, setIsLoading] = useState(true);



    // TODO muss noch checken ob user in einem anderen plan nicht nur ob er ein owner von einem plan ist!!!!



    useEffect(() => {
        setIsLoading(true);
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
        setIsLoading(false);
    },[hasPlan])


    return {
        hasPlan: hasPlan,
        setHasPlan: setHasPlan
    }

}
