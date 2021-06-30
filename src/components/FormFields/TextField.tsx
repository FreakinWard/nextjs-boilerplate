import { TextField as MuiTextField } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';

interface Props {
  name: string;
  label: string;
}

export default function TextField({ name, label }: Props) {
  const [field] = useField(name);
  return (
    <MuiTextField
      fullWidth
      // id="email"
      name={field.name}
      label={label}
      value={field.value}
      onChange={field.onChange}
      // error={formik.touched.email && Boolean(formik.errors.email)}
      // helperText={formik.touched.email && formik.errors.email}
    />
  );
}
