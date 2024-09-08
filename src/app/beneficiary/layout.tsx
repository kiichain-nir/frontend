'use client';

import { Box } from '@mui/material';

import Header from 'src/layouts/main/header';

const Layout = ({ children }: any) => (
  <>
    <Header />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: { xs: 8, md: 10 },
      }}
    >
      {children}
    </Box>
  </>
);

export default Layout;
