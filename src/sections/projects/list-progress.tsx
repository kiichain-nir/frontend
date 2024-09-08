import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card, { CardProps } from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  value: number;
  total: number;
}

export default function BudgetProgress({ title, value, total, sx, ...other }: Props) {
  return (
    <Card sx={{ p: 1, ...sx }} {...other}>
      <LinearProgress
        value={(value / total) * 100}
        variant="determinate"
        color="primary"
        sx={{
          my: 2,
          height: 6,
          '&:before': {
            bgcolor: 'divider',
            opacity: 1,
          },
        }}
      />

      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="flex-end"
        sx={{ typography: 'subtitle2' }}
      >
        <Box
          sx={{
            mr: 0.5,
            typography: 'body2',
            color: 'text.disabled',
          }}
        >
          {value}
        </Box>

        {` / ${total}`}
      </Stack>
    </Card>
  );
}
