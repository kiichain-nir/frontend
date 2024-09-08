import { FC, useState, useEffect } from 'react';

import {
  Stack,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAssignTokens, useProjectDetailSubgraph } from 'src/services/projects';

interface AssignTokensProps {
  selectedBeneficiaries: `0x${string}`[];
  txHash: `0x${string}`;
}

const AssignTokens: FC<AssignTokensProps> = ({ selectedBeneficiaries, txHash }) => {
  const assignTokens = useAssignTokens();
  const [tokenQuantity, setTokenQuantity] = useState(0);

  const openModal = useBoolean();
  const projectdetails = useProjectDetailSubgraph(txHash);

  const handleSubmit = async () => {
    await assignTokens.mutateAsync({
      tokenAddress: projectdetails?.tokenAddress,
      tokenQuantity: String(tokenQuantity),
      walletAddresses: selectedBeneficiaries,
    });
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    openModal.onFalse();
  };

  useEffect(() => {
    if (assignTokens.isSuccess) {
      openModal.onFalse();
    }
  }, [assignTokens.isSuccess, openModal]);

  return (
    <div className="p-6">
      <Button onClick={openModal.onTrue} variant="outlined">
        Assign Tokens
      </Button>

      <Dialog
        open={openModal.value}
        onClose={openModal.onToggle}
        aria-labelledby="assign-tokens-modal-title"
        aria-describedby="assign-tokens-modal-description"
      >
        <DialogTitle id="assign-tokens-modal-title">Assign Tokens</DialogTitle>
        <Stack>
          <DialogContent>
            <TextField
              type="number"
              label="Enter number of tokens"
              value={tokenQuantity}
              onChange={(e) => setTokenQuantity(Number(e.target.value))}
              fullWidth
              margin="normal"
            />
          </DialogContent>
        </Stack>
        <DialogActions>
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="secondary"
            disabled={assignTokens.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={assignTokens.isPending}
          >
            Assign Tokens
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AssignTokens;
