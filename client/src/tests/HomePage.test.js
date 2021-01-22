
import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from "react-router-dom";
import Home from "../pages/Home";
import AuthProvider from "../components/AuthProvider";

describe('<Home/>', () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <Home/>
            </AuthProvider>,
            { wrapper: MemoryRouter}
        );
    });

    it('render home page with header and footer and main card', () => {
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(screen.getByTestId("homecard")).toBeInTheDocument();
    });


    it("render correctly",() => {
        expect(screen.getByText('Press "+" to add a new Plan')).toBeInTheDocument();
        expect(screen.getByText('Welcome')).toBeInTheDocument();
    })

    it('switch language test',() => {
        const switchLangDE = screen.getByText('DE');
        fireEvent.click(switchLangDE);
        expect(screen.getByText('Datenschutz')).toBeInTheDocument();
        const switchLangEN = screen.getByText('EN');
        fireEvent.click(switchLangEN);
        expect(screen.getByText('Privacy protection')).toBeInTheDocument();

    })

    it('addPlan Modal is shown when button clicked', () => {
        const addPlan = screen.getByText('+');
        fireEvent.click(addPlan);
        expect(screen.getByText("Add your Plan's name")).toBeInTheDocument();
    })
})