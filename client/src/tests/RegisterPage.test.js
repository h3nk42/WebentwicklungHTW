import React from "react";
import Register from "../pages/Register";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({push: mockHistoryPush}),
}));

describe('<Register/>', () => {
    describe("When registering", () => {
        beforeEach(() => {
            render(<Register/>);
        });

        describe('When page is initialized', () => {
            test('then shows the register card', () => {
                expect(screen.getByTestId("register-card")).toBeInTheDocument();
                expect(screen.getByText("Already have an account?")).toBeInTheDocument();
                expect(screen.getByTestId("registration-form")).toBeInTheDocument();
            })

            test('then renders the form correctly', () => {
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

            test('then disable register button when the inputs are empty', () => {
                const usernameInput = screen.getByTestId("username-register");
                const passwordInput = screen.getByTestId("password-register");
                const confirmPasswordInput = screen.getByTestId("confirm-password");
                fireEvent.change(usernameInput, {'target': {'value': ''}});
                fireEvent.change(passwordInput, {'target': {'value': ''}});
                fireEvent.change(confirmPasswordInput, {'target': {'value': ''}});
                const registerBtn = screen.getByTestId('register-btn');
                expect(registerBtn).toHaveAttribute('disabled');
                screen.debug(registerBtn);
                fireEvent.change(usernameInput, {'target': {'value': 'Aduhay'}});
                fireEvent.change(passwordInput, {'target': {'value': 'aduhay'}});
                fireEvent.change(confirmPasswordInput, {'target': {'value': 'aduhay'}});
                screen.debug(registerBtn);
                expect(registerBtn).not.toHaveAttribute('disabled');
            })
        });

        describe('When sign in here button is clicked', () => {
            test('then route to login page', () => {
                const signInHereButton = screen.getByTestId('sign-in');
                fireEvent.click(signInHereButton);
                expect(mockHistoryPush).toHaveBeenCalledWith('/login');
            });
        });
    })
})