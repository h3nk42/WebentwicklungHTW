import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Login from "../pages/Login";
import AuthProvider from "../components/AuthProvider";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({push: mockHistoryPush}),
}));

describe('<Login/> Tests', () => {

    beforeEach(() => {
        render(
            <AuthProvider>
                <Login/>
            </AuthProvider>
        );
    });

    it('render the login card', () => {
        expect(screen.getByTestId("login-card")).toBeInTheDocument();
        expect(screen.getByText("New to DoYourDishes?")).toBeInTheDocument();
        expect(screen.getByTestId("login-form")).toBeInTheDocument();
    });

    it('render the form correctly', () => {
        const usernameLabel = screen.getByText(/Username :/);
        const passwordLabel = screen.getByText(/Password :/);
        const usernameInput = screen.getByTestId("username-login");
        const passwordInput = screen.getByTestId("password-login");
        expect(usernameLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
        expect(usernameInput).toHaveAttribute('type', 'text');
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('disable login button when username and password are empty', () => {
        const usernameInput = screen.getByTestId("username-login");
        const passwordInput = screen.getByTestId("password-login");
        const loginBtn = screen.getByTestId('login-btn');
        fireEvent.change(usernameInput, {'target': {'value': ''}});
        fireEvent.change(passwordInput, {'target': {'value': ''}});
        expect(loginBtn).toHaveAttribute('disabled');
    });

    it('activate login button when username and password are filled', () => {
        const usernameInput = screen.getByTestId("username-login");
        const passwordInput = screen.getByTestId("password-login");
        const loginBtn = screen.getByTestId('login-btn');
        fireEvent.change(usernameInput, {'target': {'value': 'Aduhay'}});
        fireEvent.change(passwordInput, {'target': {'value': 'aduhay'}});
        expect(loginBtn).not.toHaveAttribute('disabled');
    });

    it('route to register page', () => {
        const createAccountButton = screen.getByTestId('create-account')
        fireEvent.click(createAccountButton);
        expect(mockHistoryPush).toHaveBeenCalledWith('/register');
    });
});
