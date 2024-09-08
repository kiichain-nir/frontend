import axios from 'axios';
import { UUID } from 'crypto';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + 'api/v1' || 'http://localhost:3333/api/v1',
});
const GRAPH_URL = process.env.NEXT_PUBLIC_GRAPH_URL;

export const endpoints = {
  projects: {
    add: '/projects',
    list: '/projects',
    single: (uuid: UUID) => `/projects/${uuid}`,
  },
  beneficiaries: {
    list: '/beneficiaries',
    single: (uuid: UUID) => `/beneficiaries/${uuid}`,
    add: '/beneficiaries',
  },
  vendors: {
    list: '/vendors',
    single: (uuid: UUID) => `/vendors/${uuid}`,
    add: '/vendors',
  },
  reports: {
    beneficiariesGeoData: '/reports/beneficiaries-geo-data',
    beneficairyGenderData: '/reports/demography-gender',
    beneficiaryAgeRangeData: '/reports/demography-age-range',
  },
};

export default {
  GRAPH_URL,
};
