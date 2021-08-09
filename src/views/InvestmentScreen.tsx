import React from 'react'
import InvestmentForm from '../components/InvestmentForm'
import { useDispatch } from 'react-redux';
import { addEmail, addAmount } from '../store/investmentSlice';
import { useHistory } from 'react-router';

const InvestmentScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmitHandler = (email: string, amount: number) => {
        dispatch(addEmail(email));
        dispatch(addAmount(amount));

        history.push('/confirm');
    }

    return (
        <main>
            <header>
                <h3>Step 2</h3>
                <h1>Enter Your information</h1>
            </header>
        <InvestmentForm handleSubmit={onSubmitHandler} />
            
        </main>
    )
}

export default InvestmentScreen
