'use client';

import Image from 'next/image';
import { ConnectKitProvider } from 'connectkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GraphQlProvider from './subgraph';

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectKitProvider
        theme="nouns"
        options={{
          customAvatar: ({ radius }) => (
            <Image
              src="/punk.webp"
              alt="avatar"
              style={{ borderRadius: radius }}
              width={radius}
              height={radius}
            />
          ),
        }}
      >
        <GraphQlProvider>{children}</GraphQlProvider>
      </ConnectKitProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" /> */}
    </QueryClientProvider>
  );
};
