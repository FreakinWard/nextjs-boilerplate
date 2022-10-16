import { SvgIconComponent } from '@mui/icons-material';
import { ListItemIcon, MenuItem } from '@mui/material';

export interface MenuOptionProps {
  icon: SvgIconComponent;
  children: string;
  onClick?: () => void;
}

export default function MenuOption({ icon: Icon, children, onClick }: MenuOptionProps) {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <Icon fontSize="small" />
      </ListItemIcon>
      {children}
    </MenuItem>
  );
}
