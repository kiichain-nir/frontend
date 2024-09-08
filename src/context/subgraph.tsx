'use client';

import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

import routes from '../constants/api';

const GRAPHQL_URL: string = routes.GRAPH_URL || 'http://localhost:8888';

const client = new Client({
  url: GRAPHQL_URL,
  exchanges: [cacheExchange, fetchExchange],
});

const GraphQlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider value={client}>{children}</Provider>
);
export default GraphQlProvider;
