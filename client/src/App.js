import React from 'react';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';
import Profile from './pages/Profile';
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPlan from "./pages/myPlan/MyPlan";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./components/AuthProvider";
import './themes/dark.css';
import './themes/light.css';


function App() {


    return (
        <AuthProvider>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <PrivateRoute path="/profile" component={Profile}/>
                    <PrivateRoute path="/home" component={Home}/>
                    <PrivateRoute path="/myPlan" component={MyPlan}/>
                    <PrivateRoute path="/impressum" component={Impressum}/>
                    <PrivateRoute path="/datenschutz" component={Datenschutz}/>
                </Switch>
            </HashRouter>
        </AuthProvider>
    );
}

export default App;
