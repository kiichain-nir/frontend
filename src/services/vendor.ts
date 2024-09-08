import { UUID } from 'crypto';
import { useQuery } from '@tanstack/react-query';

import { api, endpoints } from '.';

export const useGetVendorDetail = (uuid: UUID) =>
  useQuery({
    queryKey: ['single-vendor'],
    queryFn: () => api.get(endpoints.vendors.single(uuid)),
  });
