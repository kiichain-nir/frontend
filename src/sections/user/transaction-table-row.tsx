import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Label from 'src/components/label';

import { Typography } from '@mui/material';
import { truncateAddress } from 'src/utils/string';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  tokenSymbol: string;
  rwaRepresentation: string;
};

export default function TransactionTableRow({ row, rwaRepresentation, tokenSymbol }: Props) {
  const {
    transactionHash,
    blockNumber,
    blockTimestamp,
    __typename,
    amount,
    benAddress,
    vendorAddress,
    value,
    from,
    to,
  } = row;

  const renderPrimaryListText = () => {
    if (__typename === 'ProjectCreated') {
      return (
        <>
          <Typography variant="body2">
            <strong>Project</strong>: {row?.name}
          </Typography>
        </>
      );
    }
    if (__typename === 'Transfer') {
      return (
        <>
          <Typography variant="body2">
            <strong>From</strong>: {truncateAddress(from, 10, 6)}
          </Typography>
          <Typography variant="body2">
            <strong>To</strong>: {truncateAddress(to, 10, 6)}
          </Typography>
        </>
      );
    }
    if (__typename === 'BeneficiaryAdded') {
      return (
        <>
          <Typography variant="body2">
            <strong>Beneficiary</strong>: {truncateAddress(benAddress, 10, 6)}
          </Typography>
        </>
      );
    }
    if (__typename === 'VendorAdded') {
      return (
        <>
          <Typography variant="body2">
            <strong>Vendor</strong>: {truncateAddress(vendorAddress, 10, 6)}
          </Typography>
        </>
      );
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            primary={renderPrimaryListText()}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {amount ? `${amount} ${tokenSymbol}` : value ? `${value} ${tokenSymbol}` : '-'}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {new Date(Number(blockTimestamp) * 1000).toLocaleString()}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label variant="soft" color="info">
            {truncateAddress(transactionHash, 10, 2)}
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label variant="soft" color="info">
            {__typename}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}
