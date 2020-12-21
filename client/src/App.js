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
import './darkmode/dark.css';
import './darkmode/lightTheme.css';

function App() {

    const {token, setToken, userName} = useToken();

    // if (!token) {
    //     return <LoginForm setToken={setToken}/>
    // }

    return (
        <Router>
            <Switch>
                <Route exact path="/" render={props => <LandingPage/>}/>
                <Route path="/login" render={props => <Login setToken={setToken}/>}/>
                <Route path="/register" render={props => <Register/>}/>
                <Route path="/profile" render={props => <Profile userName={userName()}/>}/>
                <Route path="/home" render={props => <Home userName={userName()}/>}/>
            </Switch>
        </Router>
    );
}

export default App;
