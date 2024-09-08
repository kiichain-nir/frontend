import { UUID } from 'crypto';
import { useParams, useRouter } from 'next/navigation';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { useBoolean } from 'src/hooks/use-boolean';

import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  row: any;
};

export default function VendorListTable({ row }: Props) {
  const { from , to, blockTimestamp, value } = row;
  const date = new Date(blockTimestamp * 1000)?.toLocaleDateString('en-GB');

  return (
    <TableRow hover>
      <TableCell>{from}</TableCell>
      <TableCell>{to}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
}
