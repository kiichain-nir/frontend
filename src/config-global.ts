import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
export const ASSETS_API = process.env.NEXT_PUBLIC_ASSETS_API;

export const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.projects.root; // as '/dashboard'

export const projectContract =
  process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS || '0xFAf1687268BCcb99D8B6946C88F4d461C8e98dbb';
