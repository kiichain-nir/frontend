import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import { IJobItem } from 'src/types/job';

import BudgetProgress from './list-progress';

// ----------------------------------------------------------------------

type Props = {
  job: IJobItem;
  onView: VoidFunction;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export default function JobItem({ job, onView, onEdit, onDelete }: Props) {
  const popover = usePopover();

  const {
    name,
    availableBudget,
    budget,
    description,
    imageUrl,
    rwaRepresentation,
    tokenName,
    tokenSymbol,
    tokenAddress,
    txHash,
  } = job;

  return (
    <Card>
      <Stack sx={{ p: 3, pb: 2 }}>
        <Avatar alt={name} src={imageUrl} variant="rounded" sx={{ width: 48, height: 48, mb: 2 }} />

        <ListItemText
          sx={{ mb: 1 }}
          primary={
            <Link component={RouterLink} href={paths.projects.details(job.uuid)} color="inherit">
              {name}
            </Link>
          }
          secondary={`${description.slice(0, 100)}...`}
          primaryTypographyProps={{
            typography: 'subtitle1',
          }}
          secondaryTypographyProps={{
            mt: 1,
            component: 'span',
            typography: 'caption',
            color: 'text.disabled',
            height: 40,
          }}
        />
        {tokenAddress === 'Indexing' ? (
          <Alert severity="info">
            <ListItemText
              primary="Project is being indexed. "
              secondary="Chain interaction available once indexing completes."
            />
          </Alert>
        ) : (
          <BudgetProgress value={+availableBudget} total={+budget} />
        )}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
        {[
          {
            label: rwaRepresentation,
            icon: <Iconify width={16} icon="solar:house-door-bold" sx={{ flexShrink: 0 }} />,
          },
          {
            label: `${tokenName} (${tokenSymbol})`,
            icon: <Iconify width={16} icon="solar:coin-bold" sx={{ flexShrink: 0 }} />,
          },
          {
            label: txHash,
            icon: <Iconify width={16} icon="solar:document-text-bold" sx={{ flexShrink: 0 }} />,
          },
          {
            label: description,
            icon: <Iconify width={16} icon="solar:text-bold" sx={{ flexShrink: 0 }} />,
          },
        ].map((item) => (
          <Stack
            key={item.label}
            spacing={0.5}
            flexShrink={0}
            direction="row"
            alignItems="center"
            sx={{ color: 'text.disabled', minWidth: 0 }}
          >
            {item.icon}
            <Typography variant="caption" noWrap>
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Card>
  );
}
