import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../slice/userSlice';
import { useNavigate } from 'react-router-dom';

function MyAppBar(props) {
    const dispatch = useDispatch();
    const { name, online } = useSelector(state => state.user)
    const { showLogout } = props;
    const navigate = useNavigate()

    const logoutUser = () => {
        dispatch(logout());
        navigate("/");
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                    LiveFeed
                </Typography>
                {online && <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                    Welcome {name}!
                </Typography>}

                {showLogout && <Button variant='contained' color='error' onClick={logoutUser}>
                    Logout</Button>}
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default MyAppBar