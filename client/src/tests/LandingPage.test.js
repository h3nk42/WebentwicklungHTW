import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LandingPage from "../pages/LandingPage";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({push: mockHistoryPush}),
}))

describe('Test for Landing Page', () => {

    test('Test Rendering', () => {
        const {getByTestId} = render(<LandingPage/>)
        expect(getByTestId('logo')).toBeInTheDocument()
    })

    test('Test Routing Log In', () => {
        const {getByTestId} = render(<LandingPage/>)
        const logInButton = getByTestId('login-button')
        fireEvent.click(logInButton);
        expect(mockHistoryPush).toHaveBeenCalledWith('/login');
    })

    test('Test Routing Register', () => {
        const {getByTestId} = render(<LandingPage/>)
        const registerButton = getByTestId('register-button')
        fireEvent.click(registerButton);
        expect(mockHistoryPush).toHaveBeenCalledWith('/register');
    })
})