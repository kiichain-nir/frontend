'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserNewEditForm from './user-new-edit-form';
import Header from 'src/layouts/main/header';

// ----------------------------------------------------------------------

export default function ProjectCreateView() {
  const settings = useSettingsContext();

  return (
    <Container sx={{ pt: 16 }}>
      <Header />
      <CustomBreadcrumbs
        heading="Create Project"
        links={[
          {
            name: 'Projects',
            href: paths.projects.root,
          },
          {
            name: 'New',
            href: paths.projects.new,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm />
    </Container>
  );
}
