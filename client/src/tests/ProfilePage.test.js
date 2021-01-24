import React from "react";
import {fireEvent, render, screen, cleanup} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from "react-router-dom";
import Profile from "../pages/Profile";
import AuthProvider from "../components/AuthProvider";

describe('<Profile/>', () => {

    afterEach(cleanup);

    beforeEach(() => {
        render(
            <AuthProvider>
                <Profile/>
            </AuthProvider>,
            {wrapper: MemoryRouter}
        );
    });

    it('render profile page with header, footer and profile card', () => {
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('profile-card')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('render profile card correctly', () => {
        expect(screen.getByTestId('profile-title')).toBeInTheDocument();
        expect(screen.getByTestId(/profile-pic/i)).toBeInTheDocument();
        expect(screen.getByText('Username :')).toBeInTheDocument();
        expect(screen.getByText('First name :')).toBeInTheDocument();
        expect(screen.getByText('Surname :')).toBeInTheDocument();
        expect(screen.getByText('Date of birth :')).toBeInTheDocument();
        expect(screen.getByText('Plan :')).toBeInTheDocument();
    });

    it('switch theme when dark-mode button is clicked', () => {
        const darkModeToggle = screen.getByTestId("dark-mode-toggle");
        fireEvent.click(darkModeToggle);
        expect(screen.getByTestId("profile-pic-dark")).toBeInTheDocument();
        expect(screen.queryByTestId("profile-pic-light")).not.toBeInTheDocument();
        expect(screen.getByTestId("edit-dark")).toBeInTheDocument();
        expect(screen.queryByTestId("edit-light")).not.toBeInTheDocument();
        fireEvent.click(darkModeToggle);
        expect(screen.getByTestId("profile-pic-light")).toBeInTheDocument();
        expect(screen.queryByTestId("profile-pic-dark")).not.toBeInTheDocument();
        expect(screen.getByTestId("edit-light")).toBeInTheDocument();
        expect(screen.queryByTestId("edit-dark")).not.toBeInTheDocument();
    })

    it('show form when edit profile is clicked', () => {
        const edit = screen.getByTestId("edit-light");
        fireEvent.click(edit);
        expect(screen.getByTestId("profile-form")).toBeInTheDocument();
        expect(screen.getByTestId("cancel-btn")).toBeInTheDocument();
        expect(screen.getByTestId("save-btn")).toBeInTheDocument();

        // Disable button when form is empty
        const saveBtn = screen.getByTestId('save-btn');
        const cancelBtn = screen.getByTestId('cancel-btn');
        expect(saveBtn).toHaveAttribute('disabled');
        expect(cancelBtn).toBeInTheDocument();

        // Enable button when form is filled
        const nameInput = screen.getByLabelText("First name :");
        const surnameInput = screen.getByLabelText("Surname :");
        fireEvent.change(nameInput, {'target': {'value': 'James'}});
        fireEvent.change(surnameInput, {'target': {'value': 'Hannigan'}});
        expect(saveBtn).not.toHaveAttribute('disabled');

        // Click cancel button
        fireEvent.click(cancelBtn);
        const firstName = screen.getByTestId("firstName");
        const surName = screen.getByTestId("surName");
        expect(firstName).toBeInTheDocument();
        expect(surName).toBeInTheDocument();
        expect(firstName.textContent).toBe("-");
        expect(surName.textContent).toBe("-");
    })

    it('change language when language button is clicked', () => {
        const deutschBtn = screen.getByTestId("btn-language-de");
        const englishBtn = screen.getByTestId("btn-language-en");
        fireEvent.click(deutschBtn);
        expect(screen.queryByText('First name :')).not.toBeInTheDocument();
        expect(screen.queryByText('Surname :')).not.toBeInTheDocument();
        expect(screen.queryByText('Date of birth :')).not.toBeInTheDocument();
        expect(screen.getByText('Vorname :')).toBeInTheDocument();
        expect(screen.getByText('Nachname :')).toBeInTheDocument();
        expect(screen.getByText('Geburtsdatum :')).toBeInTheDocument();
        fireEvent.click(englishBtn);
        expect(screen.queryByText('Vorname :')).not.toBeInTheDocument();
        expect(screen.queryByText('Nachname :')).not.toBeInTheDocument();
        expect(screen.queryByText('Geburtsdatum :')).not.toBeInTheDocument();
        expect(screen.getByText('First name :')).toBeInTheDocument();
        expect(screen.getByText('Surname :')).toBeInTheDocument();
        expect(screen.getByText('Date of birth :')).toBeInTheDocument();
    })
})
