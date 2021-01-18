import React from 'react';
import {AuthContext} from "../context/auth";
import useToken from "../hooks/useToken";
import useDarkMode from "../hooks/useDarkMode";

function AuthProvider({children}) {
    const {token, setToken, userName} = useToken();
    const [darkMode, setDarkMode, componentMounted] = useDarkMode();

    if (!componentMounted) {
        return <div/>
    }

    return (
        <AuthContext.Provider value={{token, setToken, userName, darkMode, setDarkMode}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;