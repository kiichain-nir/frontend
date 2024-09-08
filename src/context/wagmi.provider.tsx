'use client';

import { WagmiProvider } from 'wagmi';

import { config } from '../wagmi.config';

export const Wagmi = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider config={config}>{children}</WagmiProvider>
);
