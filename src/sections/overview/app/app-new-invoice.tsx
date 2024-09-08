import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { truncateAddress } from 'src/utils/string';
import { useParams } from 'next/navigation';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type RowProps = {
  amount?: string;
  benAddress?: string;
  blockNumber: string;
  blockTimestamp: string;
  id: string;
  tokenAddress?: string;
  transactionHash: string;
  project?: string;
  vendorAddress?: string;
  __typename: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
  tokenSymbol?: string;
}

export default function AppNewInvoice({
  title,
  subheader,
  tableData,
  tableLabels,
  tokenSymbol,
  ...other
}: Props) {
  const { uuid } = useParams();
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <AppNewInvoiceRow key={row.id} row={row} tokenSymbol={tokenSymbol} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          href={paths.projects.transaction.root(uuid)}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppNewInvoiceRowProps = {
  row: RowProps;
  tokenSymbol?: string;
};

function AppNewInvoiceRow({ row, tokenSymbol }: AppNewInvoiceRowProps) {
  const popover = usePopover();

  return (
    <>
      <TableRow>
        <TableCell>{truncateAddress(row.transactionHash, 10, 2)}</TableCell>
        <TableCell> {truncateAddress(row.benAddress || row.vendorAddress, 10, 2)}</TableCell>
        <TableCell>{row.amount ? `${row.amount} ${tokenSymbol}` : 'N/A'}</TableCell>
        <TableCell>{new Date(Number(row.blockTimestamp) * 1000).toLocaleString()}</TableCell>
        <TableCell>
          <Label variant="soft" color="info">
            {row.__typename}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}
