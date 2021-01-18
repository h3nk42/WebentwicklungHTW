import React from "react";
import {MemoryRouter} from "react-router-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Header from "../components/header/Header";
import AuthProvider from "../components/AuthProvider";

describe('Dark-mode Tests', () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <Header/>
            </AuthProvider>,
            {wrapper: MemoryRouter}
        );
    });

    it("show light theme by default", () => {
        const lightModeLogo = screen.getByAltText("light theme logo");
        expect(lightModeLogo).toBeInTheDocument();
    });

    it("change theme when button is clicked", () => {
        const darkModeToggle = screen.getByTestId("dark-mode-toggle");
        fireEvent.click(darkModeToggle);
        expect(screen.getByAltText("dark theme logo")).toBeInTheDocument();
        fireEvent.click(darkModeToggle);
        expect(screen.getByAltText("light theme logo")).toBeInTheDocument();
    });
});