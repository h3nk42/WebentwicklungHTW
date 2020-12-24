import {useState} from "react";

export default function useToken() {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);

    const getToken = () => {
        return user?.token;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('user', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    const getUserName = () => {
        return user?.userName;
    }

    return {
        setToken: saveToken,
        token,
        userName: getUserName()
    }
}