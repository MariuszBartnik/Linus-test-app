import React, { useState } from 'react'
import ConfirmationForm from '../components/ConfirmationForm'
import axios from 'axios';

const ConfirmationScreen = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [modalDisplay, setModalDisplay] = useState(false);

    const onSubmitHandle = async (project_id: number, email: string, investment_amount: number) => {   
        setModalDisplay(true);
        setLoading(true);
        try{
            const serverResponse = await axios.post('http://localhost:5000/api/investment', {project_id, email, investment_amount});
            const returnedData = serverResponse.data;
        
            if(returnedData.success) {
                setLoading(false);
                setSuccess(true)
            }
        }catch(err) {
            setLoading(false);
            setError(true);
        }
    } 
    return (
        <main>
            <header>
                <h3>Step 3</h3>
                <h1>Confirm Your information</h1>
            </header>

            <ConfirmationForm handleSubmit={onSubmitHandle} />

            {modalDisplay && (
                <div className="modal">
                    <div className="modal-dialog">
                        {loading && (<p> Loading... </p>)}
                        {success && (
                            <>
                                <p>Investment information saved successfully. Confirmation email has been sent.</p>
                                <button className="close-modal" onClick={() => {setModalDisplay(false)}}>Close</button>
                            </>
                        )}
                            
                        {error && (
                            <>
                                <p>Error has occured. Data could not be saved. Please try again</p>
                                <button className="close-modal" onClick={() => {setModalDisplay(false)}}>Close</button>
                            </>
                        )}
                    </div>
                </div>
            )}


        </main>
    )
}

export default ConfirmationScreen
