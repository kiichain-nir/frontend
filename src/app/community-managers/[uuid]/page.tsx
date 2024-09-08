'use client';
import {
  Alert,
  Avatar,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableBody,
  TableContainer,
  Typography,
  useTheme,
} from '@mui/material';
import { UUID } from 'crypto';
import { isEmpty } from 'lodash';
import isEqual from 'lodash/isEqual';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Scrollbar from 'src/components/scrollbar';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import BeneficiaryProfile from 'src/sections/beneficiary/profile';
import AppWidgetSummary from 'src/sections/overview/app/app-widget-summary';
import VendorListTable from 'src/sections/projects/vendor/vendor-list-row';
import LatestVendorTransaction from 'src/sections/vendor/latest-card';
import VendorDonut from 'src/sections/vendor/vendor-donut';
import {
  useProject,
  useVendor,
  useVendorDetails,
  useVendorTransactions,
} from 'src/services/projects';
import { fDate, fTimestamp, fToNow } from 'src/utils/format-time';
import { truncateAddress } from 'src/utils/string';

const defaultFilters: any = {
  name: '',
  role: [],
  status: 'all',
};

const TABLE_HEAD = [
  { id: 'walletAddress', label: 'Wallet' },
  { id: 'to', label: 'To', width: 100 },
  { id: 'timestamp', label: 'Time', width: 180 },
  { id: 'amount', label: 'Amount', width: 220 },
  { id: '', width: 88 },
];

const VendorView = () => {
  const theme = useTheme();
  const methods = useForm({});
  const [step, setStep] = useState(-1);

  const table = useTable();

  const denseHeight = table.dense ? 56 : 56 + 20;

  const { watch } = methods;

  const values = watch();

  const { uuid } = useParams() as { uuid: UUID };

  const venDetails = useVendor(uuid);
  const project = useProject(venDetails?.data?.projectUUID);
  const vendorTransactions = useVendorTransactions(venDetails?.data?.walletAddress);
  const [latestTransaction, ...remainingTransactions] = vendorTransactions?.transferTxn || [{}];

  const venBalanceDetails = useVendorDetails(
    venDetails?.data?.walletAddress,
    vendorTransactions?.all?.data?.vendorAddeds[0]?.project
  );

  console.log('latestTransaction', latestTransaction);
  useEffect(() => {
    const steps = Object.values(values).filter((value) => value !== undefined || 0).length;
    values?.projects && setStep(steps - 1);
  }, [values]);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: vendorTransactions?.transferTxn || [],
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  return (
    <Container
      sx={{
        py: { xs: 2, md: 4 },
      }}
    >
      <Grid spacing={3} container justifyContent="space-between" mt={3}>
        <Grid item sm={12} lg={4} md={4}>
          <BeneficiaryProfile
            name={venDetails?.data?.name}
            email={venDetails?.data?.email}
            walletAddress={venDetails?.data?.walletAddress}
            imageURL="https://cryptopunks.app/cryptopunks/cryptopunk7613.png"
          />
        </Grid>
        <Grid item sm={12} lg={4} md={4}>
          <LatestVendorTransaction
            title="Total Received"
            total={Number(venBalanceDetails?.balance)}
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
            value={Number(latestTransaction?.value)}
            secondary={
              !isEmpty(latestTransaction)
                ? fToNow(
                    new Date(latestTransaction?.blockTimestamp * 1000).toLocaleDateString() ||
                      Date.now()
                  )
                : ''
            }
          />
        </Grid>
        <Grid item sm={12} lg={4} md={4}>
          <LatestVendorTransaction
            title="Latest Transaction"
            secondary={new Date(latestTransaction?.blockTimestamp * 1000).toLocaleTimeString()}
            total={latestTransaction?.value}
            value={truncateAddress(latestTransaction?.from, 8, 6)}
            chart={{
              series: vendorTransactions?.transferTxn.map((txn) => txn.value),
            }}
          />
        </Grid>
      </Grid>

      <Alert sx={{ marginTop: 4 }} variant="outlined" severity="info">
        1 {project?.data?.data?.tokenName} token represents 1{' '}
        {project?.data?.data?.rwaRepresentation}.
      </Alert>
      <Typography variant="h5" mt={4}>
        Your Transactions
      </Typography>

      <TableContainer sx={{ position: 'relative', overflow: 'unset', marginTop: 2 }}>
        <TableSelectedAction
          dense={table.dense}
          numSelected={table.selected.length}
          rowCount={dataFiltered.length}
          onSelectAllRows={(checked) =>
            table.onSelectAllRows(
              checked,
              dataFiltered.map((row) => row.id)
            )
          }
        />

        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />
            {dataFiltered.length > 0 && (
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <VendorListTable key={row?.id} row={row} />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            )}
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        //
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Container>
  );
};

export default VendorView;

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: any[];
  comparator: (a: any, b: any) => number;
  filters: any;
}) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData?.map((el, index) => [el, index] as const);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
