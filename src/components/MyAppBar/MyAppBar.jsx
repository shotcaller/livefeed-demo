import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'

function MyAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                    LiveFeed
                </Typography>
                <Button color='inherit'>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default MyAppBar