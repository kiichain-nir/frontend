'use client';

import React from 'react';
import { UUID } from 'crypto';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';

import { Grid, Chip, Card, Stack, Button, useTheme, Typography } from '@mui/material';

import { fDate } from 'src/utils/format-time';

import {
  useProject,
  useBeneficiary,
  useTransferToVendor,
  useBeneficiaryDetails,
  useListProjectVendors,
  useBeneficiaryTransactions,
} from 'src/services/projects';

import Label from 'src/components/label';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import BeneficiaryProfile from 'src/sections/beneficiary/profile';
import TransferModel from 'src/sections/beneficiary/transfer-model';
import AppWidgetSummary from 'src/sections/overview/app/app-widget-summary';
import BeneficiaryClusterMap from 'src/sections/projects/beneficiaries.map';
import BeneficaryDonught from 'src/sections/overview/app/app-current-download';
import BeneficiaryTransaction from 'src/sections/beneficiary/recent-transaction';

interface BeneficiaryTransfer {
  amount: string;
  to: `0x${string}`;
}

const BeneficaryDetails = () => {
  const methods = useForm({});
  const theme = useTheme();
  const { uuid: projectUUID, benID } = useParams() as { uuid: UUID; benID: UUID };

  const [open, setOpen] = React.useState(false);

  const benDetails = useBeneficiary(benID);
  const project = useProject(projectUUID);
  const router = useRouter();
  const transferfn = useTransferToVendor();
  const beneficiaryTransactions = useBeneficiaryTransactions(benDetails?.data?.walletAddress);
  const vendorList = useListProjectVendors({ projectUUID });
  const benBalanceDetails = useBeneficiaryDetails(benDetails?.data?.walletAddress);
  console.log(benBalanceDetails);

  const handleSubmit = async (data: BeneficiaryTransfer) => {
    const transferData = {
      amount: Number(data.amount),
      to: data.to,
      tokenAddress: benDetails?.data?.tokenAddress,
    };
    await transferfn.mutateAsync(transferData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormProvider methods={methods}>
      <Grid container gap={4}>
        <Grid md={7} lg={7}>
          <Typography variant="h5" mb={3}>
            {' '}
            Beneficiary Details{' '}
          </Typography>
          <BeneficiaryProfile
            name={benDetails?.data?.name}
            email={benDetails?.data?.email}
            walletAddress={benDetails?.data?.walletAddress}
          />

          <Grid container mt={4} gap={6} lg={12} md={12}>
            <Grid lg={6} md={5} sm={12}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                <Label
                  variant="soft"
                  color={
                    // eslint-disable-next-line no-nested-ternary
                    benBalanceDetails?.balance
                      ? 'success'
                      : benBalanceDetails?.balance === 0
                        ? 'error'
                        : 'warning'
                  }
                >
                  {
                    // eslint-disable-next-line no-nested-ternary
                    benBalanceDetails?.balance ? 'Token Assigned' : 'Token Not Assigned'
                  }
                </Label>
              </div>
              <RHFTextField
                name="latitude"
                label="Latitude"
                value={benDetails?.data?.latitude}
                disabled
                sx={{ marginTop: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="longitude"
                label="Longitude"
                value={benDetails?.data?.longitude}
                sx={{ marginTop: 2 }}
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="gender"
                label="Gender"
                value={benDetails?.data?.gender}
                sx={{ marginTop: 2 }}
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="age"
                label="Age"
                value={benDetails?.data?.age}
                sx={{ marginTop: 2 }}
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <RHFTextField
                name="createdAt"
                value={fDate(benDetails?.data?.createdAt)}
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
            <Grid lg={5} md={5} sm={12}>
              <BeneficiaryClusterMap />
            </Grid>
          </Grid>
        </Grid>

        <Grid md={4} lg={4}>
          <BeneficaryDonught
            title="Beneficiary RWA"
            chart={{
              series: [
                {
                  label: 'Remaining',
                  value: Number(benBalanceDetails?.balance) || 0,
                },
                {
                  label: 'Redeemed',
                  value:
                    Number(benBalanceDetails?.totalTokenAssigned - benBalanceDetails?.balance) || 0,
                },
              ],
              colors: ['#72A0C1', '#6CB4EE'],
            }}
          />
          <Button onClick={handleOpen}> Transfer </Button>
          <TransferModel
            open={open}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            vendors={vendorList}
          />
          <Typography variant="h6" sx={{ marginTop: 4 }} color="gray">
            RWA Information
          </Typography>
          <AppWidgetSummary
            title={`Redeemed ${project?.data?.data?.rwaRepresentation} (${project?.data?.data?.tokenSymbol})`}
            total={Number(benBalanceDetails?.totalTokenAssigned - benBalanceDetails?.balance) || 0}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            sx={{ marginTop: 2 }}
          />
          <AppWidgetSummary
            title={`Remaining ${project?.data?.data?.rwaRepresentation} (${project?.data?.data?.tokenSymbol}) to claim`}
            total={Number(benBalanceDetails?.balance) || 0}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            sx={{ marginTop: 2 }}
          />
        </Grid>
      </Grid>
      <Stack spacing={2} mt={4}>
        <BeneficiaryTransaction
          list={beneficiaryTransactions?.transactions}
          title="Recent Transactions"
          tokenSymbol={project?.data?.data?.tokenSymbol}
          rwaRepresentation={project?.data?.data?.rwaRepresentation}
        />
      </Stack>
    </FormProvider>
  );
};

export default BeneficaryDetails;
