import Button from '@material-ui/core/Button';

import { useAuth } from '../../context/AuthProvider/AuthProvider';

export default function SignInButton() {
  const { login } = useAuth();

  return (
    <Button onClick={login} color="inherit">
      Login
    </Button>
  );
}
