import { Button, Dialog, DialogActions, DialogContent, Divider } from '@mui/material';
import React from 'react'

const ListDialog = (props) => {
  const open = props.open;
  const onClose = props.onClose??null;
  const children = props.children??(<></>);
  const maxWidth = props.maxWidth??'md';

  const handleClose = () => {
    if(onClose) onClose();
  }
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={true}>
      <DialogContent>
      {children}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose}>Done</Button>
      </DialogActions>
    </Dialog> 
  )
}

export default ListDialog