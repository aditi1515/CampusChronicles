import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function ConfirmDialog({ btnText, message, setOpen, open, onAccept }) {


 const handleClickOpen = () => {
  setOpen(true);

 };

 const handleClose = () => {
  setOpen(false);
 };



 return (
  <div>
   <Button sx={{ fontSize: '11px', padding: '2px' }} variant="outlined" onClick={handleClickOpen}>
    {btnText}
   </Button>
   <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
   >
    <DialogTitle id="alert-dialog-title">
     {"Confirm me!!!"}
    </DialogTitle>
    <DialogContent>
     <DialogContentText id="alert-dialog-description">
      {message}
     </DialogContentText>
    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}>Disagree</Button>
     <Button onClick={onAccept} autoFocus>
      Agree
     </Button>
    </DialogActions>
   </Dialog>
  </div>
 );
}