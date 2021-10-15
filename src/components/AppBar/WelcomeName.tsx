import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';

import { useIsAuthenticated, useMsal } from '../../context/AuthProvider';

export default function WelcomeName() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [name, setName] = useState(null);

  const activeAccount = instance.getActiveAccount();
  useEffect(() => {
    if (activeAccount) {
      setName(activeAccount.name.split(' ')[0]);
    }
  }, [activeAccount]);

  if (!isAuthenticated) return null;

  return <Typography variant="h6">Welcome, {name}</Typography>;
}
