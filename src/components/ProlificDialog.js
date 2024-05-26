import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

function ProlificIdDialog({ open, onClose }) {
  const [prolificId, setProlificId] = useState('');

  const handleSave = () => {
    onClose(prolificId);
  };

  return (
    <Dialog open={open} onClose={() => onClose('')}>
      <DialogTitle>Prolific ID</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter your Prolific ID:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Prolific ID"
          type="text"
          fullWidth
          value={prolificId}
          onChange={(e) => setProlificId(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose('')} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProlificIdDialog;
