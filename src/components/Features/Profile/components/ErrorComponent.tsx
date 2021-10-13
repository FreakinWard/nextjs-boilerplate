import { Typography } from '@material-ui/core';

interface Props {
  error: {
    errorCode: string;
  };
}

export default function ErrorComponent({ error }: Props) {
  return <Typography variant="h6">An Error Occurred: {error.errorCode}</Typography>;
}
