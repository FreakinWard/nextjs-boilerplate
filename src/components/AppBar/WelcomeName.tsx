import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';

import { useAuth } from '../../context/AuthProvider/AuthProvider';

export default function WelcomeName() {
  const { userAccount, isAuthenticated } = useAuth();
  const [name, setName] = useState(null);

  useEffect(() => {
    if (userAccount) {
      setName(userAccount.name.split(' ')[0]);
    }
  }, [userAccount]);

  if (!isAuthenticated) return null;

  return <Typography variant="h6">Welcome, {name}</Typography>;
}
