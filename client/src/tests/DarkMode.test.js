import React from "react";
import {MemoryRouter} from "react-router-dom";
import Header from "../components/header/Header";
import {fireEvent, render, screen} from "@testing-library/react";
import {AuthContext} from "../context/auth";
import '@testing-library/jest-dom/extend-expect';

describe('Dark-mode Tests', () => {
    const theme = {
        darkMode: "light",
        setDarkMode: jest.fn(),
    }

    beforeEach(() => {
        render(
            <AuthContext.Provider value={theme}>
                <MemoryRouter>
                    <Header/>
                </MemoryRouter>
            </AuthContext.Provider>
        );
    });

    it("show light theme by default", () => {
        const lightModeLogo = screen.getByAltText("light theme logo");
        expect(lightModeLogo).toBeInTheDocument();
    });

    it("change theme when button is clicked", () => {
        const darkModeToggle = screen.getByTestId("dark-mode-toggle");
        fireEvent.click(darkModeToggle);
        expect(theme.setDarkMode).toHaveBeenCalledTimes(1);
        fireEvent.click(darkModeToggle);
        expect(theme.setDarkMode).toHaveBeenCalledTimes(2);
    });
});