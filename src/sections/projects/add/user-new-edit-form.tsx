import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { useAddProjectContract } from 'src/services/projects';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField } from 'src/components/hook-form';

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

export default function UserNewEditForm({ currentUser }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const createProject = useAddProjectContract();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Project Name is required'),
    tokenName: Yup.string().required('Token Name is required'),
    tokenQuantity: Yup.number()
      .required('Token Quantity is required')
      .positive('Token Quantity must be positive'),
    tokenSymbol: Yup.string().required('Token Symbol is required'),
    rwaRepresentation: Yup.string().required('Real World Asset Representation is required'),
    description: Yup.string(),
    imageUrl: Yup.string().url('Invalid URL'),
    contractAddress: Yup.string(),
  });

  const defaultValues = useMemo(() => ({}), []);

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
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  console.log('values', values);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createProject.mutateAsync(data);
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.projects.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const [project, setProject] = useState<Project>();

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }} display="flex" flexDirection="column" gap={3} alignItems="center">
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  background: `url(${project?.imageUrl})`,
                  borderRadius: '50%',
                  backgroundSize: 'cover',
                  border: '1px solid lightgray',
                  opacity: '0.9',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '10px',
                    display: project?.imageUrl ? 'none' : 'block',
                    opacity: '0.6',
                  }}
                >
                  IMAGE
                </span>
              </div>
              <RHFTextField
                onChange={(e) => {
                  setProject({ ...project, imageUrl: e.target.value });
                }}
                name="imageUrl"
                label="Image URL"
              />
            </Box>

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Asset Backed Confirmation
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Confirm whether the token is fully backed by the declared Real World Asset.
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
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
              <RHFTextField name="name" label="Project Name" />
              <RHFTextField name="description" label="Description of the project" />
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
              <RHFTextField name="tokenName" label="Token Name" />
              <RHFTextField name="tokenSymbol" label="Token Symbol" />
              <RHFTextField name="tokenQuantity" label="Token Quantity" />
              <RHFTextField name="rwaRepresentation" label="RWA Representation" />
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
                disabled={!values?.isVerified}
              >
                Create Project
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
