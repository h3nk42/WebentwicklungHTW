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
import useToken from "./hooks/useToken";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './themes/dark.css';
import './themes/light.css';
import useDarkMode from "./hooks/useDarkMode";

function App() {

    const {token, setToken, userName} = useToken();
    const [darkMode, setDarkMode, componentMounted] = useDarkMode();

    if (!componentMounted) {
        return <div/>
    }

    // if (!token) {
    //     return <LoginForm setToken={setToken}/>
    // }

    return (
        <Router>
            <Switch>
                <Route exact path="/" render={props => <LandingPage/>}/>
                <Route path="/login" render={props => <Login setToken={setToken}/>}/>
                <Route path="/register" render={props => <Register/>}/>
                <Route path="/profile" render={props => <Profile userName={userName()} setDarkMode={setDarkMode}/>}/>
                <Route path="/home" render={props => <Home userName={userName()} setDarkMode={setDarkMode}/>}/>
            </Switch>
        </Router>
    );
}

export default App;
