import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../../slice/alertPopupSlice';

const AlertPopup = () => {
  const {open, message, type, duration} = useSelector((state) => state.alertPopup);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAlert());
  };
  
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} variant='filled' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertPopup;