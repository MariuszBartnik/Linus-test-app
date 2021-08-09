import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useHistory } from 'react-router-dom';


interface ConfirmationFormProps {
    handleSubmit: (project_id: number, email: string, investment_amount: number) => void
}

const ConfirmationForm = ({handleSubmit} : ConfirmationFormProps) => {
    const email = useSelector((state: RootState) => state.investment.email);
    const project = useSelector((state: RootState) => state.investment.project);
    const amount = useSelector((state: RootState) => state.investment.amount);
    const history = useHistory();

    if(!email || !amount || !project.name) {
        history.push('/');
    }

    const validationSchema = Yup.object().shape({
        terms_and_conditions: Yup.boolean()
            .isTrue('You have to accept terms and conditions to continue')
    })
    
    return (
        <div>
            <Formik
            initialValues={{
                project_id: project.id,
                project_name: project.name,
                email,
                investment_amount: amount,
                terms_and_conditions: false
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values.project_id, values.email, values.investment_amount)}
            >
                {({values}) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="project-name">Project name</label>
                            <Field name="project-name" id="project-name" value={project.name} disabled />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email-input">Email address</label>
                            <Field type="email" name="email" id="email-input" value={email} disabled />
                        </div>

                        <div className="form-group">
                            <label htmlFor="investment-amount">Investment amount</label>
                            <Field type="number" name="investment-amount" id="investment-amount" value={amount} disabled />
                        </div>

                        <div className="form-group-checkbox">
                            <Field type="checkbox" name="terms_and_conditions" id="checked" />
                            <label htmlFor="checked">I accept the terms and conditions</label>
                        </div>

                        <button type="submit" 
                            disabled={!values.terms_and_conditions}>Invest</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ConfirmationForm
