import { Box } from '@mui/material';

import { UserListView } from 'src/sections/projects/beneficiary/view';
import BeneficiaryClusterMap from 'src/sections/projects/beneficiaries.map';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Beneficiary List',
};

export default function UserListPage() {
  return (
    <>
      <Box
        sx={{
          mb: 5,
        }}
      >
        <BeneficiaryClusterMap />
      </Box>
      <UserListView />
    </>
  );
}
