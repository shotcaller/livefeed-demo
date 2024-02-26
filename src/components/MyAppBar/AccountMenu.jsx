import { Logout, Settings } from '@mui/icons-material'
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { useLogout } from '../../hooks/useLogout';
import { useSelector } from 'react-redux';

const AccountMenu = (props) => {
  const { anchorEl, open, handleClose } = props;
  const logout = useLogout();
  const { name } = useSelector((state) => state.user);

  const handleItemClick = (itemName) => {
    handleClose();
    if(itemName == 'LOGOUT')
      logout();
  }

  const menuProps = {
    anchorEl,
    open,
    onClose: handleClose,
    anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
    transformOrigin: { horizontal: 'right', vertical: 'top' },
    PaperProps: MenuPaperProps
  }

  return (
    <Menu {...menuProps}>
      <MenuItem sx={{pointerEvents:'none'}}>
      <Typography variant='inherit' noWrap>
        Hi, {name} !
      </Typography>
      </MenuItem>
      
      <MenuItem>
        <Avatar /> Profile
      </MenuItem>

      <Divider />
      
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize='small' />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={() => handleItemClick('LOGOUT')}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>

    </Menu>
  )
}

export default AccountMenu


const MenuPaperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}