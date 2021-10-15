import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';

import { useAuth } from '../../context/AuthProvider/AuthProvider';
import { loginRequest } from '../../services/authConfig';

interface Props {
  onClose: () => void;
  open: boolean;
}

export default function AccountPicker({ onClose, open }: Props) {
  const { login, instance, accounts } = useAuth();

  const handleListItemClick = account => {
    instance.setActiveAccount(account);
    if (!account) {
      login({
        ...loginRequest,
        prompt: 'login',
      });
    } else {
      // To ensure account related page attributes update after the account is changed
      window.location.reload();
    }

    onClose();
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set active account</DialogTitle>
      <List>
        {accounts.map(account => (
          <ListItem button onClick={() => handleListItemClick(account)} key={account.homeAccountId}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={account.name} secondary={account.username} />
          </ListItem>
        ))}

        <ListItem button onClick={() => handleListItemClick(null)}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}
