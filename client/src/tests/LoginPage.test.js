import React from "react";
import Login from "../pages/Login";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {AuthContext} from "../context/auth";
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({push: mockHistoryPush}),
}));

jest.mock('axios');

describe('<Login/> Tests', () => {
    const url = "http://localhost:3001/api/";

    beforeEach(() => {
        render(
            <AuthContext.Provider value={AuthContext}>
                <Login/>
            </AuthContext.Provider>
        );
    });

    it('render the login card', () => {
        expect(screen.getByTestId("login-card")).toBeInTheDocument();
        expect(screen.getByText("New to DoYourDishes?")).toBeInTheDocument();
        expect(screen.getByTestId("login-form")).toBeInTheDocument();
    })

    it('render the form correctly', () => {
        const usernameLabel = screen.getByText(/Username :/);
        const passwordLabel = screen.getByText(/Password :/);
        const usernameInput = screen.getByTestId("username-login");
        const passwordInput = screen.getByTestId("password-login");
        expect(usernameLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
        expect(usernameInput).toHaveAttribute('type', 'text');
        expect(passwordInput).toHaveAttribute('type', 'password');
    })

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
    })

    it('route to register page', () => {
        const createAccountButton = screen.getByTestId('create-account')
        fireEvent.click(createAccountButton);
        expect(mockHistoryPush).toHaveBeenCalledWith('/register');
    });

    // it("mock axios post request", async () => {
    //     const usernameInput = screen.getByTestId("username-login");
    //     const passwordInput = screen.getByTestId("password-login");
    //     const loginBtn = screen.getByTestId('login-btn');
    //     fireEvent.change(usernameInput, {'target': {'value': 'testguy'}});
    //     fireEvent.change(passwordInput, {'target': {'value': 'testguy123'}});
    //     fireEvent.click(loginBtn);
    //     axiosMock.post.mockResolvedValueOnce({
    //         status: 200
    //     });
    //     expect(axiosMock.post).toHaveBeenCalledTimes(1);
    //     expect(axiosMock.post).toHaveBeenCalledWith("testguy");
    //     expect(axiosMock.post).toHaveBeenCalledWith("testguy123");
    // })
})