'use client';

import { UUID } from 'crypto';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import {
  Grid,
  Step,
  Alert,
  Button,
  Stepper,
  useTheme,
  MenuItem,
  Container,
  StepLabel,
  Typography,
} from '@mui/material';

import {
  useProject,
  useBeneficiary,
  useTransferToVendor,
  useBeneficiaryDetails,
  useListProjectVendors,
} from 'src/services/projects';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

import BeneficiaryProfile from 'src/sections/beneficiary/profile';
import AppWidgetSummary from 'src/sections/overview/app/app-widget-summary';

const BeneficiaryView = () => {
  const theme = useTheme();
  const methods = useForm({});
  const [step, setStep] = useState(-1);
  const { uuid } = useParams() as { uuid: UUID };
  const { watch } = methods;
  const transferfn = useTransferToVendor();

  const values = watch();

  const beneficiary = useBeneficiary(uuid);
  const projects = useProject(beneficiary?.data?.projectUUID);

  const beneficiaryDetails = useBeneficiaryDetails(beneficiary.data?.walletAddress);
  console.log('beneficiaryDetails', beneficiaryDetails);

  const vendors = useListProjectVendors({
    projectUUID: projects?.data?.data?.uuid,
  });

  useEffect(() => {
    const steps = Object.values(values).filter((value) => value !== undefined || 0).length;
    values?.projects && setStep(steps - 1);
  }, [values]);

  const handleSubmitTranfer = async (data) => {
    const transferData = {
      amount: Number(data.amount),
      to: data.vendorId,
      tokenAddress: beneficiaryDetails?.transactions[0]?.tokenAddress,
    };
    console.log('data', transferData);
    await transferfn.mutateAsync(transferData);
  };

  useEffect(() => {
    if (transferfn.isSuccess) {
      beneficiary.refetch();
      beneficiaryDetails.refetch();
      setStep(3);
    }
  }, [transferfn.isSuccess]);

  return (
    <Container
      sx={{
        py: { xs: 2, md: 4 },
      }}
    >
      <BeneficiaryProfile
        name={beneficiary.data?.name}
        email={beneficiary.data?.email}
        walletAddress={beneficiary.data?.walletAddress}
        imageURL="https://i.gadgets360cdn.com/large/cryptopunk_6046_twitter_1634554177991.jpg"
      />

      <Typography variant="h5" mt={8}>
        Redeem {projects?.data?.data?.tokenSymbol} ({projects?.data?.data?.rwaRepresentation})
      </Typography>
      <Stepper activeStep={step} sx={{ marginTop: 4 }}>
        <Step>
          <StepLabel>Select Project</StepLabel>
        </Step>
        <Step>
          <StepLabel>Select Community Manager</StepLabel>
        </Step>
        <Step>
          <StepLabel>Enter Amount</StepLabel>
        </Step>
        <Step>
          <StepLabel>Redeem</StepLabel>
        </Step>
      </Stepper>
      <Grid mt={2}>
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(handleSubmitTranfer)}>
          <RHFTextField
            name="projectId"
            label="Projects"
            placeholder="Select Project"
            fullWidth
            sx={{ marginTop: 4 }}
            InputLabelProps={{ shrink: true }}
            disabled
            value={projects?.data?.data?.name}
          />
          <RHFTextField
            name="vendorId"
            label="Community Managers"
            placeholder="Select Community Manager"
            fullWidth
            sx={{ marginTop: 4 }}
            select
            autoComplete="on"
          >
            {vendors.data?.data?.rows?.map((option) => (
              <MenuItem key={option.uuid} value={option.walletAddress}>
                {option.name}
              </MenuItem>
            ))}
          </RHFTextField>
          <RHFTextField
            name="amount"
            label="Amount"
            sx={{ marginTop: 2 }}
            type="number"
            helperText={`You can redeem up to ${beneficiaryDetails?.balance} ${projects?.data?.data?.tokenSymbol}`}
            inputProps={{
              min: 1,
              max: beneficiaryDetails?.balance,
            }}
          />

          <Alert sx={{ marginTop: 4 }} variant="outlined" severity="info">
            1 {projects?.data?.data?.tokenSymbol} token represents 1{' '}
            {projects?.data?.data?.rwaRepresentation}. Visit your nearest vendor and start
            redemption process.
          </Alert>
          {values?.amount ? (
            <Alert sx={{ marginTop: 4 }} variant="outlined" severity="warning">
              You should receive {values.amount} {projects?.data?.data?.tokenSymbol} from vendor
            </Alert>
          ) : null}
          <Grid mt={4} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              type="submit"
              variant="contained"
              color="info"
              fullWidth
              disabled={
                transferfn.isPending ||
                !values?.vendorId ||
                !values?.amount ||
                values?.amount > beneficiaryDetails?.balance
              }
            >
              Redeem
            </Button>
          </Grid>
        </FormProvider>
      </Grid>
      <Typography variant="h5" mt={4}>
        Your {projects?.data?.data?.tokenSymbol} ({projects?.data?.data?.rwaRepresentation}){' '}
      </Typography>
      <Grid container justifyContent="space-between" mt={1}>
        <Grid xs={4} md={3.9}>
          <AppWidgetSummary
            title="Total Received"
            total={beneficiaryDetails?.totalTokenAssigned}
            token="FLT"
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
            noDiagram
          />
        </Grid>

        <Grid xs={12} md={3.9}>
          <AppWidgetSummary
            title="Total Claimed"
            total={beneficiaryDetails?.totalTokenAssigned - beneficiaryDetails?.balance}
            token={projects?.data?.data?.tokenSymbol}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            noDiagram
          />
        </Grid>

        <Grid xs={12} md={3.9}>
          <AppWidgetSummary
            title="Remaining claims"
            total={
              beneficiaryDetails?.balance
                ? beneficiaryDetails?.balance
                : beneficiaryDetails?.totalTokenAssigned
            }
            token={projects?.data?.data?.tokenSymbol}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            noDiagram
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BeneficiaryView;
