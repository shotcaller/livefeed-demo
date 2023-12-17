import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { AppName } from '../../constants/constants';

const Masthead = (props) => {
  const {open, handleClose} = props;
  return (
    <>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
              Welcome to {AppName}!
          </DialogTitle>
          <DialogContent dividers>
            <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates maiores recusandae qui officiis, doloribus, illo veritatis iusto magni, soluta accusamus sequi aperiam. Eos, fugit aliquid quo perferendis fuga inventore esse?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Typography gutterBottom variant='caption'>
              a Ruturaj Ghodke production
            </Typography>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default Masthead