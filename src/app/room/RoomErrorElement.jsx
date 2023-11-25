import { Button, Typography } from '@mui/material';
import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

const RoomErrorElement = () => {
    let error = useRouteError();
    const navigate = useNavigate();
    console.error(error);
  return (
    <>
    <Typography color="red">Some error occured. Please try again later.</Typography>
    <Button onClick={() => navigate('/friends')}>OK</Button>
    </>
  )
}

export default RoomErrorElement