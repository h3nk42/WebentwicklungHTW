import React from "react";
import Login from "../pages/Login";
import {fireEvent, render, screen} from "@testing-library/react";
import {AuthContext} from "../context/auth";
import '@testing-library/jest-dom/extend-expect';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({push: mockHistoryPush}),
}));

describe('<Login/>', () => {
    describe("When logging in", () => {
        const setToken = {
            token: "test123",
        }

        beforeEach(() => {
            render(
                <AuthContext.Provider value={setToken}>
                    <Login/>
                </AuthContext.Provider>
            );
        });

        describe('When page is initialized', () => {
            test('then shows the login card', () => {
                expect(screen.getByTestId("login-card")).toBeInTheDocument();
                expect(screen.getByText("New to DoYourDishes?")).toBeInTheDocument();
                expect(screen.getByTestId("login-form")).toBeInTheDocument();
            })

            test('then renders the form correctly', () => {
                const usernameLabel = screen.getByText(/Username :/);
                const passwordLabel = screen.getByText(/Password :/);
                expect(usernameLabel).toBeInTheDocument();
                expect(passwordLabel).toBeInTheDocument();
                const usernameInput = screen.getByTestId("username-login");
                const passwordInput = screen.getByTestId("password-login");
                expect(usernameInput).toHaveAttribute('type', 'text');
                expect(passwordInput).toHaveAttribute('type', 'password');
            })

            test('then disable login button when username and password are empty', () => {
                const usernameInput = screen.getByTestId("username-login");
                const passwordInput = screen.getByTestId("password-login");
                fireEvent.change(usernameInput, {'target': {'value': ''}});
                fireEvent.change(passwordInput, {'target': {'value': ''}});
                const loginBtn = screen.getByTestId('login-btn');
                expect(loginBtn).toHaveAttribute('disabled');
                screen.debug(loginBtn);
                fireEvent.change(usernameInput, {'target': {'value': 'Aduhay'}});
                fireEvent.change(passwordInput, {'target': {'value': 'aduhay'}});
                screen.debug(loginBtn);
                expect(loginBtn).not.toHaveAttribute('disabled');
            })
        });

        describe('When create account button is clicked', () => {
            test('then route to register page', () => {
                const createAccountButton = screen.getByTestId('create-account')
                fireEvent.click(createAccountButton);
                expect(mockHistoryPush).toHaveBeenCalledWith('/register');
            })
        });
    })
})