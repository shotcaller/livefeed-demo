import { Box, Card, Typography } from '@mui/material'
import React from 'react'

const Masthead = () => {
  return (
    <>
        <Box sx={{position: 'absolute', right: 0, bottom: '15%'}}>
            <Card sx={{p: 1}}>
                
                    <Typography>
                        a Ruturaj Ghodke production
                    </Typography>
                
            </Card>
        </Box>
    </>
  )
}

export default Masthead