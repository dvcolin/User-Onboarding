import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css'
import styled from 'styled-components'
import UserCards from './UserCards'
import UserCard from './UserCard'

const StyledForm = styled(Form)`
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #414a4c;
    border-radius: 5px;
`;

const StyledField = styled(Field)`
    width: 75%;
    font-size: 1.2rem;
    border-radius: 5px;
    border: none;
    margin: 1.5rem 0;
    padding: 1rem;
`;

const Error = styled.p`
    padding: 0;
    margin: 0;
    color: red;
`;

const SubmitButton = styled.button`
    background: none;
    padding: 1rem 1.6rem;
    border: 2px solid lightgray;
    border-radius: 5px;
    font-size: 1.4rem;
    text-transform: uppercase;
    margin: 1.5rem 0;
    color: lightgray;

    :hover {
        color: white;
        border-color: white;
    }
`;

const UserForm = ({ values, touched, errors, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers(users => [...users, status])
        }
    }, [status]);

    return (
        <div>
            <StyledForm>
            <h1 style={{color: 'white'}}>User Form</h1>
                <StyledField type='text' name='name' placeholder='Enter name' />
                {touched.name && errors.name && (
                    <Error>{errors.name}</Error>
                )}

                <StyledField type='email' name='email' placeholder='Enter email' />
                {touched.email && errors.email && (
                    <Error>{errors.email}</Error>
                )}

                <StyledField type='password' name='password' placeholder='Enter password' />
                {touched.password && errors.password && (
                    <Error>{errors.password}</Error>
                )}

                <label style={{color: 'white'}}>
                I accept the terms and conditions
                <StyledField type='checkbox' name='terms' checked={values.terms} />
                </label>
                {touched.terms && errors.terms && (
                    <Error>{errors.terms}</Error>
                )}
                <SubmitButton type='submit'>Submit</SubmitButton>
            </StyledForm>
            <UserCards>
            {users.map(user => 
                <div style={{
                    height: '100px',
                }}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
            )}
            </UserCards>
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false,
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Please enter valid name'),
        email: Yup.string().email().required('Please enter valid email'),
        password: Yup.string().min(6).max(12).required('Please enter valid password'),
        terms: Yup.bool().oneOf([true], 'Must agree to terms and conditions'),
      }),

    handleSubmit(values, { setStatus, resetForm }) {
        axios
        .post('https://reqres.in/api/users', values)
        .then(res => {
            console.log('res', res)
            setStatus(res.data);
            resetForm();
        })
        .catch(err => {
            console.log(err.response)
        })
    }
})(UserForm);

export default FormikUserForm
