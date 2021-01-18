import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Register from "../pages/Register";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({push: mockHistoryPush}),
}));

describe('<Register/> Tests', () => {
    beforeEach(() => {
        render(<Register/>);
    });

    it('render the register card', () => {
        expect(screen.getByTestId("register-card")).toBeInTheDocument();
        expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
        expect(screen.getByTestId("registration-form")).toBeInTheDocument();
    })

    it('render the form correctly', () => {
        const usernameLabel = screen.getByText(/Username :/);
        const passwordLabel = screen.getByText("Password :");
        const confirmPasswordLabel = screen.getByText(/Confirm Password :/);
        expect(usernameLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
        expect(confirmPasswordLabel).toBeInTheDocument();
        const usernameInput = screen.getByTestId("username-register");
        const passwordInput = screen.getByTestId("password-register");
        const confirmPasswordInput = screen.getByTestId("confirm-password");
        expect(usernameInput).toHaveAttribute('type', 'text');
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    })

    it('disable register button when the inputs are empty', () => {
        const usernameInput = screen.getByTestId("username-register");
        const passwordInput = screen.getByTestId("password-register");
        const confirmPasswordInput = screen.getByTestId("confirm-password");
        fireEvent.change(usernameInput, {'target': {'value': ''}});
        fireEvent.change(passwordInput, {'target': {'value': ''}});
        fireEvent.change(confirmPasswordInput, {'target': {'value': ''}});
        const registerBtn = screen.getByTestId('register-btn');
        expect(registerBtn).toHaveAttribute('disabled');
        fireEvent.change(usernameInput, {'target': {'value': 'Aduhay'}});
        fireEvent.change(passwordInput, {'target': {'value': 'aduhay'}});
        fireEvent.change(confirmPasswordInput, {'target': {'value': 'aduhay'}});
        expect(registerBtn).not.toHaveAttribute('disabled');
    })

    it('route to login page', () => {
        const signInHereButton = screen.getByTestId('sign-in');
        fireEvent.click(signInHereButton);
        expect(mockHistoryPush).toHaveBeenCalledWith('/login');
    });
});
