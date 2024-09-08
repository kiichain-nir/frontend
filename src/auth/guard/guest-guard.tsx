import { useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

// import { useAuthContext } from '../hooks';
import { useAccount } from 'wagmi';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  // const { loading } = useAuthContext();
  // return <>{loading ? <SplashScreen /> :
  return <Container>{children}</Container>;
  // }</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter();

  const { address, isConnecting } = useAccount();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.projects.root;

  const check = useCallback(() => {
    if (address) {
      router.replace(returnTo);
    }
  }, [isConnecting, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
