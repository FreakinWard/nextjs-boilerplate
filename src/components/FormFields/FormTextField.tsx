import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import * as PropTypes from 'prop-types';

interface Props {
  name: string;
  label: string;
}

const useStyles = makeStyles(theme => ({
  formControl: {
    padding: theme.spacing(1),
  },
}));

export default function FormTextField({ name, label, ...rest }: Props) {
  const classes = useStyles();
  const [field, meta] = useField(name);
  const hasError = meta.error && meta.touched;

  return (
    <div className={classes.formControl}>
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
    </div>
  );
}

FormTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['number']),
};
