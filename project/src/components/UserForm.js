import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css'


const UserForm = ({ values, touched, errors }) => {
    const [users, setUsers] = useState([]);
    return (
        <div>
            <h1>User Form</h1>

            <Form>
                <Field className='form-input' type='text' name='name' placeholder='Enter name' />
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}

                <Field className='form-input' type='email' name='email' placeholder='Enter email' />
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}

                <Field className='form-input' type='password' name='password' placeholder='Enter password' />
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}

                <label>
                I accept the terms and conditions
                <Field className='form-input' className='form-input' type='checkbox' name='terms' checked={values.terms} />
                </label>
                <button className='form-input' type='submit'>Submit</button>
            </Form>
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
      }),

    handleSubmit(values) {
        axios
        .post('https://reqres.in/api/users', values)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
})(UserForm);

export default FormikUserForm
