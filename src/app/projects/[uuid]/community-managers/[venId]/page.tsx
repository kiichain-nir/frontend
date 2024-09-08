'use client';

import React from 'react';
import { UUID } from 'crypto';
import { isEmpty } from 'lodash';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';

import { Grid, Chip, Card, Stack, useTheme, Typography } from '@mui/material';

import { fDate, fToNow } from 'src/utils/format-time';

import {
  useVendor,
  useProject,
  useVendorDetails,
  useVendorTransactions,
} from 'src/services/projects';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import BeneficiaryProfile from 'src/sections/beneficiary/profile';
import BeneficiaryClusterMap from 'src/sections/projects/beneficiaries.map';
import BeneficaryDonught from 'src/sections/overview/app/app-current-download';
import BeneficiaryTransaction from 'src/sections/beneficiary/recent-transaction';
import VendorLineGraph from 'src/sections/projects/vendor/view/vendor-line-graph';
import LatestVendorTransaction from 'src/sections/vendor/latest-card';

const BeneficaryDetails = () => {
  const methods = useForm({});
  const theme = useTheme();
  const { uuid: projectUUID, venId } = useParams() as { uuid: UUID; venId: UUID };

  const venDetails = useVendor(venId);
  const project = useProject(projectUUID);
  const router = useRouter();
  const vendorTransactions = useVendorTransactions(venDetails?.data?.walletAddress);
  const [latestTransaction, ...remainingTransactions] = vendorTransactions?.transferTxn || [{}];

  const venBalanceDetails = useVendorDetails(
    venDetails?.data?.walletAddress,
    vendorTransactions?.all?.data?.vendorAddeds[0]?.project
  );
  console.log('venBalanceDetails', venBalanceDetails);

  return (
    <FormProvider methods={methods}>
      <Grid container gap={4}>
        <Grid md={7} lg={7}>
          <Typography variant="h5" mb={3}>
            {' '}
            Community Manager Details{' '}
          </Typography>
          <BeneficiaryProfile
            name={venDetails?.data?.name}
            email={venDetails?.data?.email}
            walletAddress={venDetails?.data?.walletAddress}
          />

          <Grid container mt={4} gap={6} lg={12} md={12}>
            <Grid lg={6} md={5} sm={12}>
              {!isEmpty(venDetails?.data?.extras) &&
                Object.keys(venDetails?.data?.extras).map((key) => (
                  <RHFTextField
                    key={key}
                    name={key}
                    label={key}
                    value={venDetails?.data?.extras[key]}
                    sx={{ marginTop: 2 }}
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                ))}

              <RHFTextField
                name="createdAt"
                value={fDate(venDetails?.data?.createdAt)}
                label="Created At"
                sx={{ marginTop: 2 }}
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <Grid mt={2}>
                <Card sx={{ p: 2 }}>
                  <Typography variant="h6" color="gray">
                    Projects
                  </Typography>
                  <Chip
                    onClick={() => router.push(`/projects/${projectUUID}`)}
                    label={project?.data?.data?.name}
                    color="info"
                  />
                </Card>
              </Grid>
            </Grid>
            <Grid lg={5} md={7} sm={12}>
              <BeneficiaryClusterMap />
            </Grid>
          </Grid>
        </Grid>

        <Grid md={4} lg={4}>
          <LatestVendorTransaction
            title="Balance"
            total={`${venBalanceDetails?.balance} ${project?.data?.data?.tokenSymbol}`}
            chart={{
              series: vendorTransactions?.transferTxn
                .map((txn) => txn.value)
                .reverse()
                .reduce((acc, value, index) => {
                  if (index === 0) {
                    acc.push(+value);
                  } else {
                    acc.push(acc[index - 1] + +value);
                  }
                  return acc;
                }, []),
            }}
            value={Number(latestTransaction?.value) + ' ' + project?.data?.data?.tokenSymbol}
            secondary={
              !isEmpty(latestTransaction)
                ? fToNow(
                    new Date(latestTransaction?.blockTimestamp * 1000).toLocaleDateString() ||
                      Date.now()
                  )
                : ''
            }
          />
          {/* <Typography variant="h6" sx={{ marginTop: 4 }} color="gray">
            RWA Information
          </Typography> */}
          {/* <AppWidgetSummary
            title={`Redeemed ${project?.data?.data?.rwaRepresentation} (${project?.data?.data?.tokenSymbol})`}
            total={Number(venBalanceDetails?.redeemed) || 0}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            sx={{ marginTop: 2 }}
          />
          <AppWidgetSummary
            title={`Remaining ${project?.data?.data?.rwaRepresentation} (${project?.data?.data?.tokenSymbol}) to claim`}
            total={Number(venBalanceDetails?.balance) || 0}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            sx={{ marginTop: 2 }}
          /> */}
        </Grid>
      </Grid>
      <Stack spacing={2} mt={4}>
        <BeneficiaryTransaction
          list={vendorTransactions?.transactions}
          title="Recent Transactions"
          tokenSymbol={project?.data?.data?.tokenSymbol}
          rwaRepresentation={project?.data?.data?.rwaRepresentation}
        />
      </Stack>
    </FormProvider>
  );
};

export default BeneficaryDetails;
