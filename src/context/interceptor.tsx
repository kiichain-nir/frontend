'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { AxiosHeaderValue } from 'axios';

import { api } from '../services';

const Interceptor = ({ children }) => {
  const { address } = useAccount();
  api.defaults.headers.walletaddress = address as AxiosHeaderValue;
  return <div>{children}</div>;
};

export default Interceptor;
