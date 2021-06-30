import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Field, Form, Formik, useFormik, useFormikContext } from 'formik';
import React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function MyForm() {
  const handleSubmit = values => alert(JSON.stringify(values, null, 2));

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: 'foobar@example.com',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const FormState = () => {
    const { values } = useFormikContext();
    return <pre>{JSON.stringify(values, 0, 2)}</pre>;
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: 'foobar@example.com',
        }}
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}>
        <Form>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <FormState />
        </Form>
      </Formik>
    </div>
  );
}
