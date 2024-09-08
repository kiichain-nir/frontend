import { useParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  title: string;
  description: string;
  blockTimestamp: number;
  amount: string;
  __typename: string;
  transactionHash: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
  tokenSymbol: string;
  rwaRepresentation: string;
}

export default function BeneficiaryTransaction({
  title,
  subheader,
  list,
  rwaRepresentation,
  tokenSymbol,
  ...other
}: Props) {
  const { uuid } = useParams();
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar>
        {list.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            rwaRepresentation={rwaRepresentation}
            tokenSymbol={tokenSymbol}
          />
        ))}
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          href={`/projects/${uuid}/transactions`}
        >
          View All Transactions
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type TransactionItemProps = {
  transaction: any;
  rwaRepresentation: string;
  tokenSymbol: string;
};

function TransactionItem({ transaction, rwaRepresentation, tokenSymbol }: TransactionItemProps) {
  const { title, description, blockTimestamp, amount, __typename, transactionHash } = transaction;
  console.log('transaction', transaction);

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{
        py: 2,
        px: 3,
        minWidth: 640,
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      <ListItemText
        primary={__typename}
        secondary={
          <>
            <span>{description}</span>
            <span>
              Amount: {amount} {rwaRepresentation} ({tokenSymbol})
            </span>

            <br />
            <span>Transaction Hash: {transactionHash}</span>
          </>
        }
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          component: 'span',
        }}
      />

      <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
        {fToNow(new Date(blockTimestamp * 1000))}
      </Box>
    </Stack>
  );
}
