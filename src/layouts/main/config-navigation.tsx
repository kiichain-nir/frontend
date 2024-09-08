import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import { title } from 'process';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Projects',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.projects.root,
  },
];
