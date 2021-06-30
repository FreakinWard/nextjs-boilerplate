import * as PropTypes from 'prop-types';

import FormTextField from './FormTextField';

interface Props {
  name: string;
  label: string;
}

export default function FormNumberField({ ...rest }: Props) {
  return <FormTextField {...rest} type="number" />;
}

FormNumberField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
