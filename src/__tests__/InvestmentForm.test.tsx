import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvestmentForm from '../components/InvestmentForm';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('Information Form Component ', () => {
    const mockedHandler = jest.fn();

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
    const mockedStore = configureStore([]);

    beforeEach(() => {
        store = mockedStore({
            investment: mockedData
        })

        render(
            <Provider store={store} >
                <InvestmentForm handleSubmit={mockedHandler} />)
            </Provider>
        )
    });

    test('should render with disabled button', () => {
        expect(screen.queryByRole('button')).toBeDisabled();
    });

    test('should changed disable state on buttton after filling form fields', async () =>  {        
        const emailInput = screen.queryByLabelText("Your email address")!;
        const amountInput = screen.queryByLabelText("Investment amount")!;

        fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
        fireEvent.blur(emailInput);
        fireEvent.change(amountInput, {target: {value: 30000}});
        fireEvent.blur(amountInput);

        expect(await screen.findByRole('button')).not.toBeDisabled();
    });

    test('should show and hide error alerts after filling form', async () => {
        const emailInput = screen.queryByLabelText("Your email address")!;
        const amountInput = screen.queryByLabelText("Investment amount")!;

        fireEvent.change(emailInput, {target: {value: 'test.com'}});
        fireEvent.blur(emailInput);
        waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        })

        fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
        fireEvent.blur(emailInput);
        waitFor(() => {
            expect(screen.getByRole('alert')).not.toBeInTheDocument();
        })

        fireEvent.change(amountInput, {target: {value: 0}});
        fireEvent.blur(amountInput);
        waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        })

        fireEvent.change(amountInput, {target: {value: 30000}});
        fireEvent.blur(amountInput);
        waitFor(() => {
            expect(screen.getByRole('alert')).not.toBeInTheDocument();
        })
    });

    test('should call a function one time with correct params', async () => {
        const emailInput = screen.queryByLabelText("Your email address")!;
        const amountInput = screen.queryByLabelText("Investment amount")!;

        fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
        fireEvent.change(amountInput, {target: {value: 30000}});
        fireEvent.click(await screen.findByRole('button'));

        waitFor(() => {
            expect(mockedHandler).toBeCalledTimes(1);
            expect(mockedHandler).toHaveBeenCalledWith({email: 'test@test.com', amount: 30000});
        })
    })

})
