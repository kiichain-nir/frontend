import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
  },

  projects: {
    root: `/projects/`,
    new: `/projects/new`,
    details: (id: string) => `/projects/${id}`,
    edit: (id: string) => `/projects/${id}/edit`,
    demo: {
      details: `/projects/${MOCK_ID}`,
      edit: `/projects/${MOCK_ID}/edit`,
    },
    beneficiary: {
      list: (projectUUID: string) => `/projects/${projectUUID}/beneficiary`,
      add: (projectUUID: string) => `/projects/${projectUUID}/beneficiary/add`,
      view: (projectUUID: string, beneficiaryUUID: string) =>
        `/projects/${projectUUID}/beneficiary/${beneficiaryUUID}`,
    },
    vendor: {
      list: (projectUUID: string) => `/projects/${projectUUID}/community-managers`,
      add: (projectUUID: string) => `/projects/${projectUUID}/community-managers/add`,
      view: (projectUUID: string, communitManagersUUID: string) =>
        `/projects/${projectUUID}/community-managers/${communitManagersUUID}`,
    },

    transaction: {
      root: (projectUUID: string) => `/projects/${projectUUID}/transaction`,
    },
  },
};
