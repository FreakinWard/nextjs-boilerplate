import { useMsal } from '@azure/msal-react';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';

export default function WelcomeName() {
  const { instance } = useMsal();
  const [name, setName] = useState(null);

  const activeAccount = instance.getActiveAccount();
  useEffect(() => {
    if (activeAccount) {
      setName(activeAccount.name.split(' ')[0]);
    }
  }, [activeAccount]);

  if (name) {
    return <Typography variant="h6">Welcome, {name}</Typography>;
  } else {
    return null;
  }
}
