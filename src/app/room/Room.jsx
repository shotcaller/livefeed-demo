import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import LKRoom from '../../components/LKRoom/LKRoom'

const Room = () => {
    const navigate = useNavigate()

    
  return (
    <>
    <Typography>This is Rooms</Typography>
    <Button variant='contained' onClick={() => navigate(-1)}>Back</Button>
    <LKRoom />
    </>
  )
}

export default Room