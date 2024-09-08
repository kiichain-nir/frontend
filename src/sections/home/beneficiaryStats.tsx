import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import AppWidgetSummary from '../overview/app/app-widget-summary';
import PieCharts from '../summary/pieCharts';
import BeneficiaryClusterMap from '../projects/beneficiaries.map';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';

const ProjectStats = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container marginX="auto" sm={12} md={10} lg={10} gap={2} marginY={12}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          sx={{ textAlign: 'center', typography: 'h3', width: '100%' }}
        >
          <Stack spacing={3} sx={{ textAlign: 'center' }}>
            <m.div variants={varFade().inDown}>
              <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
                Total Projects
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography variant="h2"> 2 </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ color: 'text.secondary' }}>
                Empowering Communities with Over 2 Projects
              </Typography>
            </m.div>
          </Stack>

          <Stack
            spacing={3}
            sx={{ textAlign: 'center', borderRight: `dashed 1px ${theme.palette.divider}` }}
          >
            <m.div variants={varFade().inDown}>
              <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
                Total Beneficiares
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography variant="h2"> 121 +</Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ color: 'text.secondary' }}>
                Supporting Over 121+ Lives and Counting
              </Typography>
            </m.div>
          </Stack>

          <Stack
            spacing={3}
            sx={{ textAlign: 'center', borderRight: `dashed 1px ${theme.palette.divider}` }}
          >
            <m.div variants={varFade().inDown}>
              <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
                Total Community Managers
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography variant="h2"> 3 </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ color: 'text.secondary' }}>
                Trusted by 3 Community Managers Across Regions
              </Typography>
            </m.div>
          </Stack>
        </Box>
      </Grid>

      <BeneficiaryClusterMap />
      <Grid container marginX="auto" sm={12} md={10} lg={10} gap={0.5} marginY={12}>
        <Grid xs={12} md={3.9}>
          <PieCharts
            title="Beneficiary Age Distribution"
            chart={{
              series: [
                { label: '0-10', value: 4344 },
                { label: '10-40', value: 5435 },
                { label: '40-60', value: 1443 },
                { label: '60+', value: 4443 },
              ],
              colors: ['#0066b2', '#007FFF', '#B9D9EB', '#00CED1'],
            }}
          />
        </Grid>
        <Grid xs={12} md={3.9}>
          <PieCharts
            title="Beneficiary Gender Distribution"
            chart={{
              series: [
                { label: 'male', value: 4344 },
                { label: 'female', value: 5435 },
              ],
              colors: ['#0066b2', '#007FFF', '#B9D9EB', '#00CED1'],
            }}
          />
        </Grid>
        <Grid xs={12} md={3.9}>
          <PieCharts
            title="Beneficiary Status"
            chart={{
              series: [
                { label: 'Not Assigned', value: 4344 },
                { label: 'Assigned', value: 5435 },
                { label: 'Redeemed', value: 1443 },
              ],
              colors: ['#0066b2', '#007FFF', '#B9D9EB'],
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectStats;
