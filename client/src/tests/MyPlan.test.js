
import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from "react-router-dom";
import MyPlan from "../pages/myPlan/MyPlan";
import AuthProvider from "../components/AuthProvider";

describe('<MyPlan/>', () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <MyPlan/>
            </AuthProvider>,
            { wrapper: MemoryRouter}
        );
    });

    it('render myPlan page with header and footer and main card', () => {
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(screen.getByTestId("myplancard")).toBeInTheDocument();
    });


    it('add Task Modal is shown when button is clicked',() => {
        const addTask = screen.getByText('+');
        fireEvent.click(addTask)
        expect(screen.getByText("Add your Task's name")).toBeInTheDocument();
        expect(screen.getByText("TasksName")).toBeInTheDocument();
        expect(screen.getByText("Points worth")).toBeInTheDocument();
    })

    it('change tab and update view when users is clicked',() => {
        const userTab = screen.getByText('Users');
        fireEvent.click(userTab);
        expect(screen.getByText("Owner:")).toBeInTheDocument();
    })



})