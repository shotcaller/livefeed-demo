import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Friends() {
  const navigate = useNavigate();

  const navigateToRoom = () => {
    navigate("/room")
  }
  return (
    <>
    <Typography variant='h1'>Friends</Typography>
    <Button variant='contained' color='success' onClick={navigateToRoom}>Call</Button>
    </>
  )
}

export default Friends