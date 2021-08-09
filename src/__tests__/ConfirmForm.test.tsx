import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import ConfirmationForm from "../components/ConfirmationForm";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('Confirmation Form component', () => {
    let store;
    const mockedData = {
        project: {
            id: 1,
            name: 'Road renovation',
            location: 'Warsaw'
        },
        email: 'test@test.com',
        amount : 20000
    }
    const mockedHandler = jest.fn();
    const mockedStore = configureStore([]);

    beforeEach(() => {
        store = mockedStore({
            investment: mockedData
        })

        render(
            <Provider store={store} >
                <ConfirmationForm handleSubmit={mockedHandler} />)
            </Provider>
        )
    });

    test('Should render input fields with correct values', () => {
        expect(screen.getByLabelText('Project name')).toHaveValue(mockedData.project.name);
        expect(screen.getByLabelText('Email address')).toHaveValue(mockedData.email);
        expect(screen.getByLabelText('Investment amount')).toHaveValue(mockedData.amount);
    });

    test('Should render with disabled button', () => {
        expect(screen.getByRole('button')).toBeDisabled();
    });

    test('Should change disable button status, when checkbox is clicked', async () => {
        fireEvent.click(screen.getByRole('checkbox'));
        
        expect(await screen.findByRole('button')).not.toBeDisabled();
    })

    test('should have been called 1 time with correct parameters', () => {
        fireEvent.click(screen.getByRole('checkbox'));
        fireEvent.click(screen.getByRole('button'));

        waitFor(() => {
            expect(mockedHandler).toHaveBeenCalledTimes(1);
            expect(mockedHandler).toHaveBeenCalledWith({project_id: mockedData.project.id, email: mockedData.email, investment_amount: mockedData.amount});
        })

    })
})

