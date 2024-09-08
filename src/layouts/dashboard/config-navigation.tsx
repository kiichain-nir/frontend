import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  user: icon('ic_user'),

  product: icon('ic_product'),

  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();
  const { uuid } = useParams() as { uuid: string };

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('project'),
        items: [
          {
            title: t('summary'),
            path: paths.projects.details(uuid),
            icon: ICONS.dashboard,
          },
          {
            title: t('beneficiaries'),
            path: paths.projects.beneficiary.list(uuid),
            icon: ICONS.user,
            children: [
              { title: t('list beneficiary'), path: paths.projects.beneficiary.list(uuid) },
              { title: t('add beneficiary'), path: paths.projects.beneficiary.add(uuid) },
            ],
          },
          {
            title: t('community managers'),
            path: paths.projects.vendor.list(uuid),
            icon: ICONS.product,
            children: [
              { title: t('list community managers'), path: paths.projects.vendor.list(uuid) },
              { title: t('add community managers'), path: paths.projects.vendor.add(uuid) },
            ],
          },
        ],
      },
      {
        subheader: t('Reports'),
        items: [
          {
            title: t('transaction'),
            path: paths.projects.transaction.root(uuid),
            icon: ICONS.product,
          },
        ],
      },
    ],
    [t, uuid]
  );

  return data;
}
