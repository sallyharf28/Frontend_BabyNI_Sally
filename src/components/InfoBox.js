import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import './InfoBox.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div className="Righttop">
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        About
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p:2 }} id="customized-dialog-title">
         <b> Baby NI</b>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom style={{ color: '#316488' }}>
          Baby NI aims to deliver a user-friendly interface for visualizing the aggregated telco data. This involves intuitive dashboard, graph and grid to represent KPIs such as RSL_DEVIATION, RSL_INPUT_POWER, and MAX_RX_LEVEL. 
          It facilitates user interaction, allowing stakeholders to gain valuable insights into network performance and assess the impact of telco data over hourly and daily intervals. 
          Additionally, Baby NI design will consider user accessibility and responsiveness to ensure a seamless experience.
          Overall, the project strives to provide a holistic solution, integrating Back-end processes with a user-friendly Front-end for effective telco data management and analysis.
          </Typography>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            CLOSE
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
    </div>
  );
}