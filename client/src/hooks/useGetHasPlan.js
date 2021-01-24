import React, {useEffect, useState} from "react";
import axios from "axios";
import {useAuth} from "../context/auth";



export default function useGetHasPlan() {

    const {user,token} = useAuth();
    const API_URL = process.env.REACT_APP_API_URL;
    const headers = {Authorization: `Bearer ${token}`};
    const [hasPlan, setHasPlan] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


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
