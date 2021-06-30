import { TextField } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';

interface Props {
  name: string;
  label: string;
}

export default function FormTextField({ name, label }: Props) {
  const [field, meta] = useField(name);
  const hasError = meta.error && meta.touched;

  return (
    <TextField
      fullWidth
      name={field.name}
      label={label}
      value={field.value}
      onChange={field.onChange}
      error={hasError}
      helperText={hasError && meta.error}
    />
  );
}
