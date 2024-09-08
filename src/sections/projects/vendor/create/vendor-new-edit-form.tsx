import * as Yup from 'yup';
import { UUID } from 'crypto';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';

import {
  useProject,
  useCreateProjectVendor,
  useProjectDetailSubgraph,
} from 'src/services/projects';

import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
};

export default function VendorNewEditForm({ currentUser }: Props) {
  const router = useRouter();
  const [extraFields, setExtraFields] = useState([{ key: '', value: '' }]);

  const { enqueueSnackbar } = useSnackbar();
  const addVendor = useCreateProjectVendor();
  const { uuid: projectUUID } = useParams<{ uuid: UUID }>();
  const project = useProject(projectUUID);
  const projectGraphDetails = useProjectDetailSubgraph(project?.data?.data?.txHash);
  console.log('projectGraphDetails', projectGraphDetails);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    walletAddress: Yup.string().required('Wallet Address is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      walletAddress: currentUser?.walletAddress || '',
      email: currentUser?.email || '',
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

  const handleExtraChange = (index: number, field: string, value: string) => {
    const newExtraFields = [...extraFields];
    newExtraFields[index][field] = value;
    setExtraFields(newExtraFields);
  };

  const addExtraField = () => {
    setExtraFields([...extraFields, { key: '', value: '' }]);
  };

  const removeExtraField = (index: number) => {
    const newExtraFields = extraFields.filter((_, i) => i !== index);
    setExtraFields(newExtraFields);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const extra = extraFields.reduce((acc, field) => {
        if (field.key && field.value) {
          acc[field.key] = field.value;
        }
        return acc;
      }, {});
      await addVendor.mutateAsync({
        projectUUID,
        ...data,
        extras: extra,
        tokenAddress: projectGraphDetails?.tokenAddress,
      });
      reset();
      setExtraFields([{ key: '', value: '' }]);
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.projects.vendor.list(projectUUID));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

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
              <RHFTextField name="name" label="Community Manager Name" />
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
              <Stack width="50%" my={3}>
                <Label>Extra (JSON)</Label>
                {extraFields.map((field, index) => (
                  <Box key={index} display="flex" mb={2}>
                    <TextField
                      type="text"
                      variant="outlined"
                      placeholder="Key"
                      value={field.key}
                      onChange={(e) => handleExtraChange(index, 'key', e.target.value)}
                      sx={{ mr: 2, flex: 1 }}
                    />
                    <TextField
                      type="text"
                      variant="outlined"
                      placeholder="Value"
                      value={field.value}
                      onChange={(e) => handleExtraChange(index, 'value', e.target.value)}
                      sx={{ flex: 1 }}
                    />
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={() => removeExtraField(index)}
                      sx={{ ml: 2 }}
                      size="small"
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
                <Button
                  type="button"
                  variant="soft"
                  onClick={addExtraField}
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Add Field
                </Button>
              </Stack>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="secondary"
                loading={isSubmitting}
              >
                Create Community Manager
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
