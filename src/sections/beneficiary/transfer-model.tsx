import React, { useState, FormEvent } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Label from 'src/components/label/label';

interface ModalFormProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
  vendors: any;
}

const TransferModel: React.FC<ModalFormProps> = ({ open, handleClose, handleSubmit, vendors }) => {
  const [amount, setAmount] = useState<string>('');
  const [vendor, setVendor] = useState<string>('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      amount,
      to: vendor,
    };
    handleSubmit(data);
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Transfer to vendor
        </Typography>
        <Box component="form" sx={{ mt: 2 }} onSubmit={onSubmit}>
          <Label>Amount</Label>
          <TextField
            fullWidth
            margin="normal"
            id="input1"
            label="amount"
            variant="outlined"
            value={amount}
            name="amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-label">Input 2</InputLabel>
            <Select
              labelId="select-label"
              id="input2"
              value={vendor}
              onChange={(e) => setVendor(e.target.value as string)}
              label="Community Manager"
              variant="outlined"
            >
              {vendors.data?.data?.rows?.map((option) => (
                <MenuItem key={option.name} value={option.walletAddress}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TransferModel;
