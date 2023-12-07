import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: '#ededed',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const buttonStyle = {
  color: 'red',
  backgroundColor: 'yellow',
  borderRadius: '5px',
  border: '1px solid black'
}

export default function DeleteConfModal({DeleteComponent, setDeleteTrue, handleDeleteReload, item}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{border: '1px solid #93bae9', borderRadius: '4px'}}>
      <Button onClick={handleOpen}>Delete</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to delete?
            </Typography>
            <Button size="small" sx={buttonStyle} onClick={() => {DeleteComponent(item.id), setDeleteTrue(true), handleDeleteReload()}}>Yes</Button>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Deleting the fishy is permanent
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}