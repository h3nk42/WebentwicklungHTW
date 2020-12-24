import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import Profile from './pages/Profile';
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './themes/dark.css';
import './themes/light.css';
import useDarkMode from "./hooks/useDarkMode";
import useToken from "./hooks/useToken";
import {AuthContext} from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {

    const {token, setToken, userName} = useToken();
    const [darkMode, setDarkMode, componentMounted] = useDarkMode();

    if (!componentMounted) {
        return <div/>
    }

    return (
        <AuthContext.Provider value={{token, setToken, userName, darkMode, setDarkMode}}>
            <Router>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <PrivateRoute path="/profile" component={Profile}/>
                    <PrivateRoute path="/home" component={Home}/>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
