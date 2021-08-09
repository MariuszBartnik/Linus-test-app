import React from 'react'
import ConfirmationForm from '../components/ConfirmationForm'

const onSubmitHandle = (project_id: number, email: string, investment_amount: number) => {   
    console.log(project_id, email, investment_amount);
} 

const ConfirmationScreen = () => {
    return (
        <main>
            <header>
                <h3>Step 3</h3>
                <h1>Confirm Your information</h1>
            </header>

            <ConfirmationForm handleSubmit={onSubmitHandle} />
        </main>
    )
}

export default ConfirmationScreen
