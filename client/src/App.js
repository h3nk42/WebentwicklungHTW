import React from 'react';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';
import Profile from './pages/Profile';
import Home from "./pages/Home";

import './themes/light.css';

import MyPlan from "./pages/MyPlan";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz"

function App() {

    return (
        <HashRouter>
            <Switch>
                <Route path="/profile" render={props => <Profile />}/>
                <Route path="/home" render={props => <Home />}/>
                <Route path="/myPlan" render={props => <MyPlan />}/>
                <Route path="/impressum" render={props => <Impressum/>}/>
                <Route path="/datenschutz" render={props => <Datenschutz/>}/>
            </Switch>
        </HashRouter>
    );
}

export default App;
