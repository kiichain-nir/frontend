import { Chain, defineChain } from 'viem';

export const kiichain: Chain = defineChain( {
  id: 123454321,
  name: 'Kiichain Testnet',
  network: 'kiichain',
  nativeCurrency: {
    name: 'KII',
    symbol: 'KII',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://a.sentry.testnet.kiivalidator.com:8645'],
    },
    public: {
      http: ['https://a.sentry.testnet.kiivalidator.com:8645'],
    },
  },
  blockExplorers: {
    default: { name: 'Kiichain Explorer', url: 'https://app.kiichain.io/kiichain' },
  },
  testnet: false,
} );
