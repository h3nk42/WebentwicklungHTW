import React from "react";
import Profile from "../pages/profile/Profile";
import App from "../App";
import {render, screen} from "@testing-library/react";
import {AuthContext} from "../context/auth";
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from "react-router-dom";

describe('<Profile/>', () => {
    beforeEach(() => {
        render(
            <AuthContext.Provider value={AuthContext}>
                <Profile/>
            </AuthContext.Provider>,
            { wrapper: MemoryRouter}
        );
    });

    it('render profile page with header, footer and profile card', () => {
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('profile-card')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('render profile card correctly', () => {
        expect(screen.getByTestId('profile-title')).toBeInTheDocument();
        expect(screen.getByAltText('profile-picture')).toBeInTheDocument();
        expect(screen.getByText('Username :')).toBeInTheDocument();
        expect(screen.getByText('Name :')).toBeInTheDocument();
        expect(screen.getByText('Surname :')).toBeInTheDocument();
        expect(screen.getByText('Date of birth :')).toBeInTheDocument();
        expect(screen.getByText('Plan :')).toBeInTheDocument();
    });

    it('switch theme when dark-mode button is clicked', () => {

    })
})
