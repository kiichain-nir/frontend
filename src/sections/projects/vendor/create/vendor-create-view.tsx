'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BeneficiaryNewEditForm from './vendor-new-edit-form';

// ----------------------------------------------------------------------

export default function BeneficiaryCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Community Manager"
        links={[
          {
            name: 'Projects',
            href: paths.projects.root,
          },
          {
            name: 'Community Manager',
            href: paths.projects.root,
          },
          {
            name: 'Add',
            href: paths.projects.new,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BeneficiaryNewEditForm />
    </Container>
  );
}
