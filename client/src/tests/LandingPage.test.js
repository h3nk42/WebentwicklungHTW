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

    it('render landing page correctly', () => {
        const logInButton = screen.getByText(/log in/i)
        const registerButton = screen.getByText(/create new account/i);
        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByText('DoYourDishes')).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
        expect(logInButton).toBeInTheDocument();

        // click login button
        fireEvent.click(logInButton);
        expect(mockHistoryPush).toHaveBeenCalledWith('/login');

        // click create new account button
        fireEvent.click(registerButton);
        expect(mockHistoryPush).toHaveBeenCalledWith('/register');
    });
});
