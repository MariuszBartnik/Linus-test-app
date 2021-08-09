import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import {RootState} from '../store/store';


interface InformationFormProps {
    handleSubmit: (email: string, amount: number) => void
}
const InvestmentForm = ({handleSubmit }: InformationFormProps) => {
    const history = useHistory();
    const project = useSelector((state:RootState) => state.investment.project);

    if(!project.name) {
        history.push('/');
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('This field is required')
            .email('Invalid email address'),
        amount: Yup.number()
            .required('This field is required')
            .min(1, 'Amount must be greater than 0')
    });

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    amount: 0
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values.email, values.amount)}
            >
                {({errors, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email-input">Your email address</label>
                            <Field type="email" name="email" required id="email-input" />
                            {errors.email && touched.email ? (
                                <div role="alert">{errors.email}</div>
                            ) : null}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="amountInput">Investment amount</label>
                            <Field type="number" name="amount" required id="amountInput"/>
                            {errors.amount && touched.amount ? (
                                <div role="alert">{errors.amount}</div>
                            ) : null}
                        </div>

                        <button type="submit" disabled={(!touched.email || !isEmpty(errors.email)) || (!touched.amount || !isEmpty(errors.amount)) }>Continue</button>
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}

export default InvestmentForm
