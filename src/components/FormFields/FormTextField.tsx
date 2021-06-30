import { TextField } from '@material-ui/core';
import { useField } from 'formik';
import * as PropTypes from 'prop-types';
import React from 'react';

interface Props {
  name: string;
  label: string;
}

export default function FormTextField({ name, label, ...rest }: Props) {
  const [field, meta] = useField(name);
  const hasError = meta.error && meta.touched;

  return (
    <TextField
      {...rest}
      fullWidth
      name={field.name}
      label={label}
      value={field.value ?? ''}
      onChange={field.onChange}
      error={hasError}
      helperText={hasError && meta.error}
    />
  );
}

FormTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['number']),
};
