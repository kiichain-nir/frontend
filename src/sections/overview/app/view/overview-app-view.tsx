'use client';

import { UUID } from 'crypto';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';

import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, Typography, InputAdornment } from '@mui/material';

import { _appInvoices } from 'src/_mock';
import {
  useProject,
  useProjectDetailSubgraph,
  useProjectTransactions,
  useRecentProjectTransactions,
} from 'src/services/projects';
import { useBeneficiaryGenderData, useBeneficiaryAgeRangeData } from 'src/services/reports';

import { useSettingsContext } from 'src/components/settings';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import PieCharts from 'src/sections/summary/pieCharts';
import ProfileCover from 'src/sections/user/profile-cover';
import FileStorageOverview from 'src/sections/file-manager/file-manager-overview';

import AppNewInvoice from '../app-new-invoice';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { uuid } = useParams() as { uuid: UUID };
  const project = useProject(uuid);
  const projectGraphDetails = useProjectDetailSubgraph(project?.data?.data?.txHash);

  const projectGenderData = useBeneficiaryGenderData({
    projectId: uuid,
  });
  console.log('projectGraphDetails', projectGraphDetails);
  const projectAgeRangeData = useBeneficiaryAgeRangeData({
    projectId: uuid,
  });

  console.log('projectGraphDetails', projectGraphDetails);

  const recentTxn = useRecentProjectTransactions(
    projectGraphDetails?.tokenAddress,
    projectGraphDetails?.projectId
  );
  console.log('recentTxn', recentTxn);

  const theme = useTheme();

  const methods = useForm({});

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <FormProvider methods={methods}>
        <Card
          sx={{
            mb: 6,
            height: 290,
          }}
        >
          <ProfileCover
            role={projectGraphDetails?.tokenAddress}
            name={project?.data?.data?.name}
            avatarUrl={
              project?.data?.data?.imageUrl ||
              'https://media.istockphoto.com/id/1327617934/photo/aerial-view-of-flooded-houses-with-dirty-water-of-dnister-river-in-halych-town-western-ukraine.jpg?s=612x612&w=0&k=20&c=ffFK1c1lx15S3PlX-tee1py2wkLiKYLad67VvFwTG2I='
            }
            coverUrl="https://static.vecteezy.com/system/resources/previews/002/091/669/original/abstract-polygonal-pattern-luxury-blue-background-premium-style-for-poster-cover-print-artwork-illustration-vector.jpg"
          />
        </Card>
        <Grid container spacing={3}>
          <Grid container sm={12} md={8} lg={8}>
            <Grid lg={12} md={12} sm={12}>
              <RHFTextField
                name="about"
                multiline
                rows={5}
                label="Project Description"
                value={project?.data?.data?.description}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <AppWidgetSummary
                title="Total Budget"
                percent={-0.1}
                total={projectGraphDetails?.balance?.budget}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
                noDiagram
              />
            </Grid>
            <Grid xs={12} md={6}>
              <AppWidgetSummary
                title="Remaining Budget"
                percent={-0.1}
                total={projectGraphDetails?.balance?.availableBudget}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
                noDiagram
              />
            </Grid>
          </Grid>

          <Grid xs={12} md={4} lg={4}>
            <FileStorageOverview
              total={projectGraphDetails?.balance?.budget}
              label="Total Budget"
              chart={{
                series: (
                  (projectGraphDetails?.balance?.availableBudget /
                    projectGraphDetails?.balance?.budget) *
                  100
                ).toFixed(4),
              }}
            />
            <Grid lg={12} md={12} sm={12} mt={2}>
              <RHFTextField
                label="RWA Representation"
                value={`1 ${project?.data?.data?.tokenName} token represent 1 ${project?.data?.data?.rwaRepresentation} `}
                name="asdf"
                sx={{ textAlign: 'center' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon icon="fluent-emoji:coin" width={24} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid container md={12} lg={12} sm={12}>
            <Grid md={4} lg={4} sm={12}>
              <PieCharts
                title="Beneficiary Gender"
                chart={{
                  series: projectGenderData?.data?.array || [],
                  colors: ['#0066b2', '#007FFF', '#B9D9EB'],
                }}
              />
            </Grid>
            <Grid md={4} lg={4} sm={12}>
              <PieCharts
                title="Beneficiary Age"
                chart={{
                  series: projectAgeRangeData?.data?.array || [],
                  colors: ['#0066b2', '#007FFF', '#B9D9EB', '#00CED1'],
                }}
              />
            </Grid>
            <Grid md={4} lg={4} sm={12}>
              <Grid xs={12} md={12} lg={12}>
                <AppWidgetSummary
                  title="Total Beneficary"
                  percent={2.6}
                  total={project?.data?.data?._count?.beneficiaries}
                  chart={{
                    series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                  }}
                  noDiagram
                />
              </Grid>

              <Grid xs={12} md={12} lg={12}>
                <AppWidgetSummary
                  title="Total Community Managers"
                  percent={0.2}
                  total={project?.data?.data?._count?.vendors}
                  chart={{
                    colors: [theme.palette.info.light, theme.palette.info.main],
                    series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                  }}
                  noDiagram
                  sx={{ marginTop: 1 }}
                />
              </Grid>

              <Grid xs={12} md={12} lg={12} mt={4}>
                <Typography variant="h6">Token Details</Typography>
                <RHFTextField
                  value={project?.data?.data?.tokenName}
                  name="asdf"
                  label="Token Name"
                  sx={{ textAlign: 'center', marginTop: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon="majesticons:coins-line" width={24} />
                      </InputAdornment>
                    ),
                  }}
                />
                <RHFTextField
                  value={project?.data?.data?.tokenSymbol}
                  name="asdf"
                  label="Token Symbol"
                  sx={{ textAlign: 'center', marginTop: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon="circum:coin-insert" width={24} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} lg={12}>
            <AppNewInvoice
              title="Recent Transactions"
              tableData={recentTxn || []}
              tokenSymbol={project?.data?.data?.tokenSymbol}
              tableLabels={[
                { id: 'txHash', label: 'Transaction Hash' },
                { id: 'walletAddress', label: 'Wallet Address' },
                { id: 'price', label: 'Amount' },
                { id: 'timestamp', label: 'Timestamp' },
                { id: 'type', label: 'Type' },
                { id: '' },
              ]}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
