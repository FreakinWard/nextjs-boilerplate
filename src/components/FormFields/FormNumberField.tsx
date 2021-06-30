import React from 'react';

import FormTextField from './FormTextField';

interface Props {
  name: string;
  label: string;
}

export default function FormNumberField({ name, label }: Props) {
  return <FormTextField name={name} label={label} type="number" />;
}
