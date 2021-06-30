import { TextField as MuiTextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Field, Form, Formik, useFormik, useFormikContext } from 'formik';
import React from 'react';
import * as yup from 'yup';

import TextField from '../components/FormFields/TextField';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function MyForm() {
  const handleSubmit = async values => {
    await new Promise(r => setTimeout(r, 500));
    alert(JSON.stringify(values, null, 2));
  };
  const FormState = () => {
    const { values } = useFormikContext();
    return <pre>{JSON.stringify(values, 0, 2)}</pre>;
  };

  const initialValues = {
    firstName: 'Tyler',
    lastName: 'Newman',
    email: 'foobar@example.com',
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <TextField name="email" label="Email" />
          <TextField name="firstName" label="First Name" />
          <TextField name="lastName" label="Last Name" />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <FormState />
        </Form>
      </Formik>
    </div>
  );
}
