import { UUID } from 'crypto';
import { useQuery } from '@tanstack/react-query';

import { filterGeoJson } from 'src/utils/map';

import { api, endpoints } from 'src/constants/api';

export const useBeneficiariesGeoData = (params: { projectId: UUID }) =>
  useQuery({
    queryKey: ['beneficiaries-geo-data'],
    queryFn: () =>
      api
        .get(endpoints.reports.beneficiariesGeoData, { params })
        .then((res) => filterGeoJson(res.data)),
  });

export const useBeneficiaryGenderData = (params: { projectId: UUID }) =>
  useQuery({
    queryKey: ['beneficiary-gender-data'],
    queryFn: () =>
      api.get(endpoints.reports.beneficairyGenderData, { params }).then((res) => ({
        array: Object.entries(res.data).map(([key, value]) => ({
          // first key is the capital letter
          label: key.charAt(0).toUpperCase() + key.slice(1),
          value,
        })),
        labels: Object.keys(res.data).map((key) => key.charAt(0).toUpperCase() + key.slice(1)),
        values: Object.values(res.data),
      })),
  });

export const useBeneficiaryAgeRangeData = (params: { projectId: UUID }) =>
  useQuery({
    queryKey: ['beneficiary-age-range-data'],
    queryFn: () =>
      api.get(endpoints.reports.beneficiaryAgeRangeData, { params }).then((res) => ({
        array: Object.entries(res.data).map(([key, value]) => ({
          // first key is the capital letter
          label: key,
          value,
        })),
        labels: Object.keys(res.data),
        values: Object.values(res.data),
      })),
  });
