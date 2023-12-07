import * as React from 'react';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MoreCardInfo(water_system_condition) {

    const water_system = water_system_condition?.water_system_condition
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 950,
        bgcolor: '#ededed',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const waterStyle = {
        textAlign: 'left'
      }
      
      const regionStyle = {
        position: 'absolute',
        float: 'right',
        textAlign: 'right'
      };  
     
    const CardInfo = () => {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);


        return ( <Box sx={{border: '1px solid #93bae9', borderRadius: '8px'}} >
        <Button onClick={handleOpen}>More Info</Button>
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
                <Box>
                    <Box sx={style}>
                        <Box sx={{display:'flex',   flexDirection: 'row', gap: 16}}>
                            <Box>
                                <Typography id="transition-modal-title" component="h2" sx={{ mt: 1.5 }}>
                                    Name: <span style={{color: '#606060', textDecoration: 'underline'}}>{water_system?.water_system.name}</span> <span style={{color: 'gray', textDecoration: 'underline'}}>({water_system?.water_system.size} {water_system?.water_system.type})</span>
                                </Typography>
                                <Typography id="transition-modal-title" component="h2" sx={{ mt: 1.5 }}>
                                    Flows: <span style={{color: '#606060', textDecoration: 'underline'}}>{water_system?.cfs}</span>                                    
                                </Typography>
                                <Typography id="transition-modal-description" component="h2" sx={{ mt: 1.5 }}>
                                    Water Color: <span style={{color: '#606060', textDecoration: 'underline'}}>{water_system?.color}</span>
                                </Typography>                        
                                <Typography id="transition-modal-description" component="h2" sx={{ mt: 1.5 }}>
                                    Water Temp: <span style={{color: '#606060', textDecoration: 'underline'}}>{water_system?.temp}</span>                                   
                                </Typography> 
                                <Typography id="transition-modal-description" component="h2" sx={{ mt: 1.5 }}>
                                    Air Temp: <span style={{color: '#606060', textDecoration: 'underline'}}>{water_system?.air_temp}</span>                                     
                                </Typography> 
                                <Typography id="transition-modal-description" component="h2" sx={{ mt: 1.5 }}>
                                    Conditions: <span style={{color: '#606060', textDecoration: 'underline'}}>{water_system?.conditions}</span>
                                </Typography>                               
                            </Box>      
                            <Box>
                                <Typography id="transition-modal-title" component="h2" sx={{ mt: 1.5 }}>
                                    City: <span style={{color: '#606060', textDecoration: 'underline'}}>{water_system?.water_system?.city}</span>
                                </Typography>
                                <Typography id="transition-modal-title" component="h2" sx={{ mt: 1.5 }}>
                                    County: <span style={{color: '#606060', textDecoration: 'underline'}}>{water_system?.water_system?.county}</span>
                                </Typography>
                                <Typography id="transition-modal-title" component="h2" sx={{ mt: 1.5 }}>
                                    State: <span style={{color: '#606060', textDecoration: 'underline'}}>{water_system?.water_system?.state}</span>
                                </Typography>
                                <Typography id="transition-modal-title" component="h2" sx={{ mt: 1.5 }}>
                                    Access Notes: <span style={{color: '#606060', textDecoration: 'underline'}}>{water_system?.water_system?.access}</span>
                                </Typography>
                            </Box> 
                        </Box>                             
                    </Box>
                </Box>                
            </Fade>
        </Modal>
    </Box>
        )
    }
    
 
    return <CardInfo/>
}


export default MoreCardInfo;
