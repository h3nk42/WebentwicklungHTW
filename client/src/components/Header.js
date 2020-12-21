import React from 'react';
import {useHistory} from 'react-router-dom';

function Header() {
    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.push("/");
    }

    return (
        <nav className="navbar navbar-light" style={{backgroundColor: '#31692b'}}>
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">DoYourDishes</span>
                <button className="btn btn-primary"
                        style={{height: '50px'}}
                        onClick={logout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Header;