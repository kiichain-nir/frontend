import { UUID } from 'crypto';
import { useParams, useRouter } from 'next/navigation';

import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import { Tooltip, IconButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: IUserItem;
  onSelectRow: VoidFunction;
};

export default function UserTableRow({ row, selected, onSelectRow }: Props) {
  const { name, gender, email, walletAddress } = row;

  const confirm = useBoolean();
  const router = useRouter();
  const { uuid } = useParams() as { uuid: UUID };

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name} src="" sx={{ mr: 2 }} />

        <ListItemText
          primary={name}
          secondary={email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{gender}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{walletAddress}</TableCell>
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="View Beneficiary Details" placement="top" arrow>
          <IconButton onClick={() => router.push(paths.projects.beneficiary.view(uuid, row.uuid))}>
            <Iconify icon="mdi:eye-outline" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
