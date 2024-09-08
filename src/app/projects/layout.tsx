'use client';

import { AuthGuard } from 'src/auth/guard';
import ProjectProvider from 'src/context/project-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <ProjectProvider>{children}</ProjectProvider>
    </AuthGuard>
  );
}
