import * as Yup from 'yup';
import { UUID } from 'crypto';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useParams, useRouter } from 'src/routes/hooks';

import { useCreateProjectBeneficiary } from 'src/services/projects';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

import FileRecentItem from 'src/sections/file-manager/file-recent-item';

import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
};

type Project = {
  tokenName?: string;
  tokenSymbol?: string;
  rwaRepresentation?: string;
  imageUrl?: string;
  tokenQuantity?: string;
};

const genderOptions = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

export default function BeneficiaryNewEditForm({ currentUser }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const addBeneficiary = useCreateProjectBeneficiary();
  const { uuid: projectUUID } = useParams<{ uuid: UUID }>();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    walletAddress: Yup.string().required('Wallet Address is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    age: Yup.number().required('Age is required').positive('Age must be positive'),
    latitude: Yup.number().required('Latitude is required').typeError('Latitude must be a number'),
    longitude: Yup.number()
      .required('Longitude is required')
      .typeError('Longitude must be a number'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      walletAddress: currentUser?.walletAddress || '',
      email: currentUser?.email || '',
      age: currentUser?.age || '',
      latitude: currentUser?.latitude || '',
      longitude: currentUser?.longitude,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addBeneficiary.mutateAsync({
        projectUUID,
        ...data,
      });
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const [project, setProject] = useState<Project>();

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={16}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Beneficiary Name" />
            </Box>

            <Box
              rowGap={3}
              columnGap={2}
              mt={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="walletAddress" label="Wallet Address" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="age" label="Age" />
              <RHFTextField name="latitude" label="Latitude" />
              <RHFTextField name="longitude" label="Longitude" />
              <RHFSelect name="gender" label="Gender">
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
              mt={3}
            >
              {values?.tokenSymbol && values?.rwaRepresentation && values?.tokenQuantity && (
                <FileRecentItem
                  name={values?.tokenSymbol as string}
                  rwaRepresentation={values?.rwaRepresentation as string}
                  tokenQuantity={values?.tokenQuantity as string}
                />
              )}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="secondary"
                loading={isSubmitting}
              >
                Create Beneficiary
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
