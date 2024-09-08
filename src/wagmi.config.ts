'use client';

import { safe } from 'wagmi/connectors';
import { getDefaultConfig } from 'connectkit';
import { http, type Config, createConfig } from 'wagmi';
import { kiichain } from './utils/custom-chains';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

export const config: Config = createConfig(
  getDefaultConfig({
    syncConnectedChain: true,
    chains: [kiichain],
    batch: {
      multicall: true,
    },
    connectors: [
      // walletConnect({
      //   projectId: '1234',
      // }),
      safe(),
    ],
    transports: {
      [kiichain.id]:http()
    },
    walletConnectProjectId: '',
    // Required App Info
    appName: 'Nirbhik',

    // Optional App Info
    appDescription: '',
    appUrl: '', // your app's url
    appIcon: '/public/logo/logo_single.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

// export default defineConfig({
//   out: 'src/generated.ts',
//   contracts: [],
//   plugins: [],
// });
