import { ListItemIcon, MenuItem } from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { ComponentType } from 'react';

export interface MenuOptionProps {
  icon: ComponentType<SvgIconProps>;
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
