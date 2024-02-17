import { Container, Typography } from '@mui/material';
import React from 'react'
import { QuickRoomForm } from '../../components/QuickRoomForm/QuickRoomForm';

function Wall() {
  
  return (
    <>
      <Typography variant='h1' component='h1'>Wall</Typography>
      <Container maxWidth='xl'>
        <QuickRoomForm />
      </Container>
    </>
  );
}

export default Wall