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
    const [allPlans, setAllPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // maybe user is not owner of plan but is in a plan
    // also checks if user is owner of plan
    // useEffect(() => {
    //     axios.get(`${API_URL}plan/findAllPlans`,)
    //         .then((response) => {
    //             setAllPlans(response.data)
    //             console.log(response.data)
    //             for (const key in response.data) {
    //                 if (response.data.hasOwnProperty(key)) {
    //                     response.data[key].map(item => {
    //                         if(item.owner === userName){
    //                             setHasPlan(true);
    //                         }else{
    //                             setHasPlan(false);
    //                             //check if user belongs to a plan
    //                             item.users.map(user => {
    //                                 if(user.userName === userName){
    //                                     setHasPlan(true);
    //                                 }else{
    //                                     setHasPlan(false);
    //                                 }
    //                             })
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // },[]) // [] dependency array, it run exactly once because empty



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
