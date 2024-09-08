import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  email: string;
  walletAddress: string;
  imageURL?: string;
};

export default function BeneficiaryProfile({ name, email, imageURL, walletAddress }: Props) {
  const renderCustomer = (
    <Stack direction="row" sx={{ p: 3 }}>
      <Avatar
        alt={name}
        src={imageURL || 'https://cryptopunks.app/cryptopunks/cryptopunk7804.png'}
        sx={{ width: 48, height: 48, mr: 2 }}
      />

      <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
        <Typography variant="subtitle2">{name}</Typography>

        <Box sx={{ color: 'text.secondary' }}>{email}</Box>

        <Box>
          <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
            {walletAddress}
          </Box>
        </Box>
      </Stack>
    </Stack>
  );

  return <Card>{renderCustomer}</Card>;
}
