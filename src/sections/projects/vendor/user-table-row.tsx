import { UUID } from 'crypto';
import { useParams, useRouter } from 'next/navigation';

import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Tooltip, IconButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';

import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  row: IUserItem;
};

export default function UserTableRow({ row }: Props) {
  const { name, email, walletAddress } = row;
  const router = useRouter();
  const { uuid } = useParams() as { uuid: UUID };

  return (
    <TableRow hover>
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

      {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{gender}</TableCell> */}

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{walletAddress}</TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="View Community Manager Details" placement="top" arrow>
          <IconButton onClick={() => router.push(paths.projects.vendor.view(uuid, row.uuid))}>
            <Iconify icon="mdi:eye-outline" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
