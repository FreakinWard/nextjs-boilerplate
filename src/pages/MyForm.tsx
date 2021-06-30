import Button from '@material-ui/core/Button';
import { Form, Formik, useFormikContext } from 'formik';
import React from 'react';
import * as yup from 'yup';

import { FormNumberField, FormTextField } from '../components/FormFields';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  firstName: yup.string().min(3, 'Your name is too short').required('First name is required'),
  lastName: yup.string().required('Required, yo'),
});

export default function MyForm() {
  const handleSubmit = async values => {
    await new Promise(r => setTimeout(r, 500));
    alert(JSON.stringify(values, null, 2));
  };
  const FormState = () => {
    const { values } = useFormikContext();
    return <pre>{JSON.stringify(values, null, 2)}</pre>;
  };

  const initialValues = {
    firstName: 'Tyler',
    lastName: 'Newman',
    email: 'tyler@newmaninc.com',
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <Form>
          <FormTextField name="email" label="Email" />
          <FormTextField name="firstName" label="First Name" />
          <FormTextField name="lastName" label="Last Name" />
          <FormNumberField name="age" label="Age" />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <FormState />
        </Form>
      </Formik>
    </div>
  );
}
