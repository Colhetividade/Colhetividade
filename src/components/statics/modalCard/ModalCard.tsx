import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './ModalCard.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "11%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
};

export interface ModalProps {
    videoModal: any;
    txtModal: any;
}

export default function BasicModal({ videoModal, txtModal }: ModalProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='txtButton'>


            <Button className='btnModalEducacao'  onClick={handleOpen}>
                <Typography color="#212121" variant='h5'>Saiba Mais</Typography>
            </Button>
            <Modal


                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
               
            >
                <Box sx={style} className='tdajdia' >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {videoModal}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {txtModal}
                    </Typography>
                </Box>
            </Modal>

        </div>
    );
}
