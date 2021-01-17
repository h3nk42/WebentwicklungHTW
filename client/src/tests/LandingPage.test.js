import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LandingPage from "../pages/LandingPage";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    useHistory: () => ({push: mockHistoryPush}),
}))

describe('<LandingPage>', () => {
    beforeEach(() => {
        render(<LandingPage/>);
    });

    describe('When visiting the website', () => {
        test('then render landing page correctly', () => {
            expect(screen.getByAltText('DoYourDishes Logo')).toBeInTheDocument();
            expect(screen.getByText('DoYourDishes')).toBeInTheDocument();
            expect(screen.getByTestId('register-button')).toBeInTheDocument();
            expect(screen.getByTestId('login-button')).toBeInTheDocument();
        });
    });

    describe('When register or login button is clicked', () => {
        test('then routing to login page', () => {
            const logInButton = screen.getByTestId('login-button')
            fireEvent.click(logInButton);
            expect(mockHistoryPush).toHaveBeenCalledWith('/login');
        });

        test('then routing to register page', () => {
            const registerButton = screen.getByTestId('register-button')
            fireEvent.click(registerButton);
            expect(mockHistoryPush).toHaveBeenCalledWith('/register');
        });
    });
})