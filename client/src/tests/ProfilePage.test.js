import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from "react-router-dom";
import Profile from "../pages/profile/Profile";
import AuthProvider from "../components/AuthProvider";

describe('<Profile/>', () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <Profile/>
            </AuthProvider>,
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
        expect(screen.getByAltText(/profile pic/i)).toBeInTheDocument();
        expect(screen.getByText('Username :')).toBeInTheDocument();
        expect(screen.getByText('Name :')).toBeInTheDocument();
        expect(screen.getByText('Surname :')).toBeInTheDocument();
        expect(screen.getByText('Date of birth :')).toBeInTheDocument();
        expect(screen.getByText('Plan :')).toBeInTheDocument();
    });

    it('switch theme when dark-mode button is clicked', () => {
        const darkModeToggle = screen.getByTestId("dark-mode-toggle");
        fireEvent.click(darkModeToggle);
        expect(screen.getByAltText("profile pic dark")).toBeInTheDocument();
        fireEvent.click(darkModeToggle);
        expect(screen.getByAltText("profile pic light")).toBeInTheDocument();
    })
})
