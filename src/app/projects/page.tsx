'use client';

import { Box } from '@mui/material';
import Header from 'src/layouts/main/header';
import { ProjectsListView } from 'src/sections/projects/view';

// ----------------------------------------------------------------------

export default function Projects() {
  return (
    <>
      {' '}
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, md: 16 },
        }}
      >
        <ProjectsListView />
      </Box>
    </>
  );
}
