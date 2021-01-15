import React from 'react';
import {NavLink} from 'react-router-dom';



function Footer () {

    return (
        <nav className="navbar navbar-light footer mt-3">
            <div className="row col-12 d-flex align-items-center text-white">
                <ul>
                    <li>
                        <NavLink
                            exact
                            to="/impressum"
                        >
                            Impressum
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact
                            to="/datenschutz"
                        >
                            Datenschutz
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );

}

export default Footer;