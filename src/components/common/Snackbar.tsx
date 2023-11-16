import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface SnackbarProps {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  position: 'top-center' | 'bottom-center' | 'top-right' | 'bottom-right';
}

const SnackbarMessage: React.FC<SnackbarProps> = ({ message, severity, position }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (
    _event: React.SyntheticEvent<Element, Event>,
    reason?: string | undefined
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const anchorOriginMap: { [key in SnackbarProps['position']]: { vertical: 'top' | 'bottom', horizontal: 'left' | 'center' | 'right' } } = {
    'top-center': { vertical: 'top', horizontal: 'center' },
    'bottom-center': { vertical: 'bottom', horizontal: 'center' },
    'top-right': { vertical: 'top', horizontal: 'right' },
    'bottom-right': { vertical: 'bottom', horizontal: 'right' },
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose as any}
        anchorOrigin={anchorOriginMap[position]}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
};

export default SnackbarMessage;
