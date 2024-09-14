import { UUID } from 'crypto';
import { useSnackbar } from 'notistack';
import { encodeFunctionData } from 'viem';
import { useQuery as useGraphQuery } from 'urql';
import { useQuery, useMutation } from '@tanstack/react-query';

import { useReadTokenBalanceOf, useWriteTokenTransfer } from 'src/hooks/contracts/generated/token';
import {
  useWriteProjectMulticall,
  useWriteProjectAddVendor,
  useWriteProjectCreateProject,
} from 'src/hooks/contracts/generated/project';

import { projectAbi } from 'src/abis';
import { projectContract } from 'src/config-global';
import { Queries } from 'src/constants/subgraph-query';

import { api, endpoints } from './index';

export const useAddProjectContract = () => {
  const con = useWriteProjectCreateProject();

  return useMutation({
    mutationFn: async ({
      name,
      tokenName,
      tokenSymbol,
      tokenQuantity,
    }: {
      name: string;
      tokenName: string;
      tokenSymbol: string;
      description: string;
      rwaRepresentation: string;
      imageUrl: string;
      tokenQuantity: string;
    }) =>
      con.writeContractAsync({
        args: [name, tokenName, tokenSymbol, BigInt(tokenQuantity)],
        address: projectContract,
        __mode: 'prepared',
      }),
    // return contract.mutate({
    //   functionName: "createProject",
    //   args: [name, tokenName, tokenSymbol],
    // });
    onSuccess: (
      tokenAddress,
      { name, tokenName, tokenSymbol, description, imageUrl, rwaRepresentation, tokenQuantity }
    ) =>
      api.post(endpoints.projects.add, {
        name,
        tokenName,
        tokenSymbol,
        description,
        imageUrl,
        rwaRepresentation,
        tokenQuantity,
        txHash: tokenAddress,
      }),
  });
};

export const useListProject = () => {
  const [projectsGraph] = useGraphQuery({
    query: Queries.projectCreated,
  });

  return useQuery({
    queryKey: ['projects-list'],
    // enabled: !!projectsGraph?.data?.projectCreateds.length,
    queryFn: async () => {
      const apiResponse = await api.get(endpoints.projects.list);
      const apiProjects = apiResponse.data;

      const combinedProjects = apiProjects.map((project) => {
        // Find the corresponding project from projectsGraph
        const graphProject = projectsGraph?.data?.projectCreateds.find(
          (p) => p?.transactionHash === project?.txHash
        );

        console.log('graphProject', graphProject, project);

        // Find the corresponding balance from projectBalances
        const projectBalance = projectsGraph?.data?.projectBalances.find(
          (balance) => balance?.id === graphProject?.projectId
        );

        // If a matching project is found, merge the data
        return {
          uuid: project?.uuid,
          name: project?.name || 'Unknown',
          tokenName: project?.tokenName || 'Unknown',
          tokenSymbol: project?.tokenSymbol || 'Unknown',
          description: project?.description || 'No description',
          rwaRepresentation: project?.rwaRepresentation || 'Unknown',
          imageUrl: project?.imageUrl || 'No image',
          tokenAddress: graphProject?.tokenAddress || 'Indexing',
          txHash: project?.txHash || 'Indexing',
          availableBudget: projectBalance?.availableBudget || 'Indexing',
          budget: projectBalance?.budget || 'Indexing',
          projectContractIndex: graphProject?.projectId || 'Indexing',
        };
      });

      return combinedProjects;
    },
  });
};

export const useProject = (uuid: UUID) =>
  useQuery({
    queryKey: ['project', uuid],
    queryFn: () => api.get(endpoints.projects.single(uuid)),
  });

// Project Beneficiaries
export const useListProjectBeneficiaries = (params: {
  projectUUID: UUID;
  page?: number;
  limit?: number;
}) =>
  useQuery({
    queryKey: ['project-beneficiaries-list', params.projectUUID],
    enabled: !!params.projectUUID,
    queryFn: () =>
      api.get(endpoints.beneficiaries.list, {
        params,
      }),
  });

export const useBeneficiary = (uuid: UUID) =>
  useQuery({
    queryKey: ['beneficiary', uuid],
    queryFn: () => api.get(endpoints.beneficiaries.single(uuid)).then((res) => res.data),
  });

export const useBeneficiaryTransactions = (walletAddress: `0x${string}`) => {
  const [beneficiaryGraph] = useGraphQuery({
    query: Queries.benTransactions,
    variables: { id: walletAddress },
  });

  const combinedData = [
    ...(beneficiaryGraph?.data?.beneficiaryAddeds || []),
    ...(beneficiaryGraph?.data?.transfers || []),
  ];

  return {
    all: beneficiaryGraph,
    transactions: combinedData,
  };
};
export const useCreateProjectBeneficiary = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    onError(error, variables, context) {
      console.error(error);
      enqueueSnackbar('Error adding beneficiary', { variant: 'error' });
    },
    onSuccess(data, variables, context) {
      console.log(data);
      enqueueSnackbar('Beneficiary added successfully', { variant: 'success' });
    },
    mutationFn: async (data: {
      projectUUID: UUID;
      beneficiaryUUID: UUID;
      walletAddress: string;
      name: string;
      email: string;
    }) => api.post(endpoints.beneficiaries.add, data),
  });
};
export const useAssignTokens = () => {
  const multi = useWriteProjectMulticall();
  const { enqueueSnackbar } = useSnackbar();
  // const assignToken = useWriteProjectAddBeneficiary();

  return useMutation({
    onError(error, variables, context) {
      console.error(error);
      enqueueSnackbar('Error assigning tokens', { variant: 'error' });
    },
    onSuccess(data, variables, context) {
      console.log(data);
      enqueueSnackbar('Tokens assigned successfully', { variant: 'success' });
    },
    mutationFn: async ({
      tokenAddress,
      walletAddresses,
      tokenQuantity,
    }: {
      tokenAddress: `0x${string}`;
      walletAddresses: `0x${string}`[];
      tokenQuantity: string;
    }) => {
      // console.log('first', [
      //   tokenAddress,
      //   walletAddresses[0],
      //   BigInt(tokenQuantity),
      //   projectContract,
      // ]);
      // return assignToken.writeContractAsync({
      //   args: [tokenAddress, walletAddresses[0], BigInt(tokenQuantity)],
      //   address: projectContract,
      //   __mode: 'prepared',
      // });
      // },
      const encodeAssignToken = walletAddresses.map((walletAddress) =>
        encodeFunctionData({
          abi: projectAbi,
          functionName: 'addBeneficiary',
          args: [tokenAddress, walletAddress, BigInt(tokenQuantity)],
        })
      );
      return multi.writeContractAsync({
        args: [encodeAssignToken],
        address: projectContract,
        __mode: 'prepared',
      });
    },
  });
};

export const useListProjectVendors = (params: {
  projectUUID: UUID;
  page?: number;
  limit?: number;
}) =>
  useQuery({
    queryKey: ['project-vendors-list', params.projectUUID],
    enabled: !!params.projectUUID,
    queryFn: () =>
      api.get(endpoints.vendors.list, {
        params,
      }),
  });

export const useCreateProjectVendor = () => {
  const { enqueueSnackbar } = useSnackbar();
  const contract = useWriteProjectAddVendor();

  return useMutation({
    onError(error, variables, context) {
      console.error(error);
      enqueueSnackbar('Error adding vendor', { variant: 'error' });
    },
    async onSuccess(data, { tokenAddress, ...variables }, context) {
      return api
        .post(endpoints.vendors.add, {
          ...variables,
          extras: JSON.stringify(variables.extras),
        })
        .then(() => {
          enqueueSnackbar('Community Manager added successfully', { variant: 'success' });
        });
    },
    mutationFn: async (data: {
      projectUUID: UUID;
      walletAddress: `0x${string}`;
      name: string;
      email: string;
      extras: Record<string, string>;
      tokenAddress: `0x${string}`;
    }) =>
      contract.writeContractAsync({
        args: [data.walletAddress, data.tokenAddress],
        address: projectContract,
        __mode: 'prepared',
      }),
  });
};
export const useVendor = (uuid: UUID) =>
  useQuery({
    queryKey: ['vendor', uuid],
    queryFn: () => api.get(endpoints.vendors.single(uuid)).then((res) => res.data),
  });

export const useProjectDetailSubgraph = (txHash: `0x${string}`) => {
  const [result] = useGraphQuery({
    query: Queries.projectDetail,
    variables: { id: txHash },
  });
  console.log('result', result);
  const info = result?.data?.projectCreateds[0];
  console.log('info', info);
  const [balances] = useGraphQuery({
    query: Queries.projectBalances,
    variables: { id: info?.projectId },
  });
  console.log('balances', balances);
  const balanceData = info
    ? balances?.data?.projectBalances.find((balance) => balance.id === info.projectId) || {}
    : {
        availableBudget: 'Indexing',
        budget: 'Indexing',
      };
  return {
    ...info,
    balance: balanceData,
  };
};

export const useBeneficiaryDetails = (walletAddress: any) => {
  const [result] = useGraphQuery({
    query: Queries.beneficiaryDetails,
    variables: { id: walletAddress },
  });

  const totalTokenAssigned = result?.data?.beneficiaryAddeds.reduce(
    (acc: any, curr: any) => acc + Number(curr.amount),
    0
  );

  const balance = useReadTokenBalanceOf({
    address: result?.data?.beneficiaryAddeds[0]?.tokenAddress,
    args: [walletAddress],
    query: {
      select(data) {
        console.log('data', data);
        return String(data);
      },
    },
  });

  return {
    totalTokenAssigned,
    redeemed: totalTokenAssigned - +balance,
    balance: balance.data,
    transactions: result?.data?.beneficiaryAddeds,
    ...balance,
  };
};

export const useVendorTransactions = (walletAddress: `0x${string}`) => {
  const [vendor] = useGraphQuery({
    query: Queries.vendorTransactions,
    variables: { id: walletAddress },
  });

  const combinedData = [...(vendor?.data?.vendorAddeds || []), ...(vendor?.data?.transfers || [])];
  const transferTxn = [...(vendor?.data?.transfers || [])].sort(
    (a, b) => +b.blockTimestamp - +a.blockTimestamp
  );
  return {
    all: vendor,
    transactions: combinedData,
    transferTxn,
  };
};

export const useVendorDetails = (walletAddress: any, projectId: string) => {
  const [result] = useGraphQuery({
    query: Queries.projectIdDetails,
    variables: { id: projectId },
    pause: !projectId && !walletAddress,
  });
  console.log(result, projectId, walletAddress);

  const balance = useReadTokenBalanceOf({
    address: result?.data?.projectDetail?.tokenAddress,
    args: [walletAddress],
    query: {
      enabled: !!result?.data?.projectDetail?.tokenAddress,
    },
  });

  return {
    balance: balance.data,
  };
};

export const useTransferToVendor = () => {
  const contract = useWriteTokenTransfer();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async ({
      tokenAddress,
      to,
      amount,
    }: {
      tokenAddress: `0x${string}`;
      to: `0x${string}`;
      amount: string;
    }) =>
      contract.writeContractAsync({
        args: [to, BigInt(amount)],
        address: tokenAddress,
        __mode: 'prepared',
      }),
    onSuccess: () => {
      enqueueSnackbar('Transfer successful', { variant: 'success' });
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar('Error transferring tokens', { variant: 'error' });
    },
  });
};

export const useProjectTransactions = (tokenAddress: string, projectId: number) => {
  const [result] = useGraphQuery({
    query: Queries.projectTransactions,
    variables: { tokenAddress, id: projectId },
  });

  const combinedData = [
    ...(result?.data?.projectCreateds || []),
    ...(result?.data?.beneficiaryAddeds || []),
    ...(result?.data?.vendorAddeds || []),
    ...(result?.data?.transfers || []),
  ];
  return combinedData.sort((a, b) => +b.blockTimestamp - +a.blockTimestamp);
};

export const useRecentProjectTransactions = (tokenAddress: string, projectId: number) => {
  const [result] = useGraphQuery({
    query: Queries.recentProjectTransactions,
    variables: { tokenAddress, id: projectId },
  });

  const combinedData = [
    ...(result?.data?.projectCreateds || []),
    ...(result?.data?.beneficiaryAddeds || []),
    ...(result?.data?.vendorAddeds || []),
    ...(result?.data?.transfers || []),
  ];
  return combinedData;
};
