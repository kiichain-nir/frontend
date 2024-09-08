/* eslint-disable react/react-in-jsx-scope */

'use client';

import { useState } from 'react';
import { ConnectKitButton } from 'connectkit';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function WalletLoginView() {
  const [errorMsg, setErrorMsg] = useState('');

  const renderHead = <Stack spacing={2} sx={{ mb: 5 }} />;

  const renderForm = (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Stack
      sx={{
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        mt: 8,
      }}
    >
      <Typography variant="h4">Welcome, to Nirbhik</Typography>
      <Typography paragraph mb={4} fontSize={13} color="gray" mt={1}>
        Connect your wallet to launch your project and embark on a transformative journey with RWA
        and KiiChain, making the world better for all.
      </Typography>
      <ConnectKitButton />
    </Stack>
  );

  return (
    <>
      {renderHead}

      {/* <Alert severity="success" sx={{ mb: 3 }}>
        Connect your wallet to continue
      </Alert> */}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      {renderForm}
    </>
  );
}
